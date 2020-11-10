import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const MottoBoxStyle = styled.div`
text-align: center;
`;

const MottoStyle = styled.div`
    display: inline-block;
    background-color:#FBF4EC;
    grid-gap: 15px;
    position: relative;
    border-radius: 6px;
    box-shadow: 0 8px 8px 0 rgb(214, 214, 214);
   margin-bottom:30px;
    text-align: center;
    font-weight: 600;
    padding:10px;
`;
const JoinButtonStyle = styled.button`
background-color: black;
color: white;
width: 100%;
height: 25px;
font-size: 15px;
font-weight: 700;
border-radius: 6px;
border: 0;
cursor: pointer;
font-family: 'Cafe24Simplehae';

`;

const JoinSubTitleStyle = styled.td`
    padding: 10px 0;
    font-size: 15px;
    font-weight: 600;
  `;
const JoinInputStyle = styled.input`
    height: 25px;
    width: 100%;
    color: rgb(100, 100, 100);
    font-size: 12px;
    border: 1px solid rgb(230, 230, 230);
  `;
 const JoinStyle = styled.div`
 display: grid;
 grid-template-columns: auto;
 justify-content: end;
 width: 200px;
 display: inline-block;
 background-color: white;
 position: relative;
 border-radius: 6px;
 padding: 20px 30px;
 box-shadow: 0 8px 8px 0 rgb(214, 214, 214);
`;
const TitleStyle = styled.div`
font-size:30px;
`;

const StatusText = styled.div`
display: inline-block;
font-size:20px;
background-color: #F8DEC3;
margin: 0 0px;
padding:10px;
border: 3px solid black;
border-radius: 5px;
line-height: 150%;
word-break: break-all;
width: 500px;
`;
const JoinButton2Style = styled.button`
    background-color: black;
    color: white;
    height: 25px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
  `;

const FamilyMotto = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.flog);

  const [flog, setFlog] = useState({
    fno: user.flog.fno,
    flog_name:"",
    flog_motto:"",
    flog_img:""
  });

  useEffect(()=>{
            
    fetch("http://localhost:8000/flog/"+user.flog.fno, {
        method: "GET",
        headers:{
        "Authorization": localStorage.getItem("Authorization")
    }
    }).then(res=>res.json()).then(res=>{
        setFlog(res); 
    });
  },[]);
  console.log("하아.....",flog);
 
  const ChangeValue = (e) => {
   
    setFlog({ ...flog, [e.target.name]: e.target.value });
    console.log(e.target.value)
  }
  var createFlog = document.querySelector("#createFlog");
  var createBtn = document.querySelector("#createBtn");
  var statustext = document.querySelector("#statustext");
  
  const UpdateFlogBtn = () => {
   
        if(createFlog.style.display=="none"){
          createFlog.style.display="grid";
          createBtn.style.display="none";
          statustext.style.display="none";     
        }else if(createFlog.style.display=="grid"){
          createFlog.style.display="none";
          createBtn.style.display="inline";
          statustext.style.display="inline-block";
    } 
  }
    const UpdateFlogBtnEnd = () =>{

        let form = document.getElementById("form");
        const formData = new FormData(form);
        fetch("http://localhost:8000/flog/"+flog.fno, {
          method:"post",
          body: formData
        }).then(res=> res.text())
        .then(res=> {
        if(res === "ok") {
          if(createFlog.style.display=="grid"){
            createFlog.style.display="none";
            createBtn.style.display="inline";
            statustext.style.display="inline-block";
      } 
          alert("블로그 수정 완료");
        } else{
          alert("블로그 수정 실패");
        }
      });      
  
      }
    

   return (

       
    <MottoBoxStyle>
       
      <MottoStyle>

         <TitleStyle>우리🐸집 가훈</TitleStyle>
            <div id="createFlog" style={{display:"none"}}>
                <JoinStyle>
                <JoinButtonStyle onClick={UpdateFlogBtn}>닫기</JoinButtonStyle>
                <form id="form" >
                <input name="fno" value={user.flog.fno} hidden></input>
                <JoinSubTitleStyle>블로그 이름</JoinSubTitleStyle>
                <JoinInputStyle type="text" name="flog_name" onChange={ChangeValue} value={flog.flog_name}/>
                <JoinSubTitleStyle>블로그 가훈</JoinSubTitleStyle>
                <JoinInputStyle type="text" name="flog_motto" onChange={ChangeValue} value={flog.flog_motto}/>
                <JoinSubTitleStyle>블로그 이미지</JoinSubTitleStyle>
                <JoinInputStyle type="file" name="flog_img" onChange={ChangeValue}  />
                </form>
                <JoinButtonStyle type="submit" onClick={UpdateFlogBtnEnd}>블로그수정</JoinButtonStyle>
                </JoinStyle>
        </div>
            <StatusText id="statustext">{flog.flog_motto}
            </StatusText>
                 <JoinButton2Style id="createBtn" onClick={UpdateFlogBtn}>수정</JoinButton2Style>

        </MottoStyle>
        </MottoBoxStyle>

       

   );
};

export default FamilyMotto;
import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const FlogBoxStyle = styled.div`
display: grid;
grid-template-columns: 2fr 1fr;
`;


const FloglistStyle = styled.div`
display : grid;
grid-template-columns: auto auto auto auto auto;
width:200px;
height:200px;
grid-gap : 10px; 
`;

const FlogWriteStyle = styled.div`
display : fixed;
justify-content : end;
margin-right: 10px;
`;
const FlogStyle = styled.div`
    display:grid;
    grid-template-columns: auto;
    background-color:#8F80F7;
    grid-gap: 15px;
    position: relative;
    border-radius: 6px;
    padding: 20px 30px;
    box-shadow: 0 8px 8px 0 #8F80F7;
  `;
const Flogimage = styled.img`
  width:150px;
  height:100px;
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
margin-top: 20px;
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

const FlogList = (props) => {

  const [flogs, setFlogs] = useState([]);
  const [pages, setPages] = useState([]);
  

  useEffect(()=>{
      fetch("http://localhost:8000/flogList")
      .then((res)=>res.json())
      .then((res)=>
      {setFlogs(res.content);
        setPages(res.pageable);
        console.log(res);
        console.log(res.content);
        console.log(res.pageable);
      }
      );
  },[]);

  const CreateFlogBtn = () => {
    var createFlog = document.querySelector("#createFlog");
    var createBtn = document.querySelector("#createBtn");
    if(createFlog.style.display=="none"){
      createFlog.style.display="grid";
      createBtn.style.display="none";
      
    }else if(createFlog.style.display=="grid"){
      createFlog.style.display="none";
      createBtn.style.display="inline";
    }else{}
  
  }

  const [flog, setFlog] = useState({
    flog_name:"",
    flog_motto:"",
    flog_img:""
  });

  const FlogSaveBtn = (e) =>{
    e.preventDefault();
    fetch("http://localhost:8000/create_flog", {
      method:"post",
      body: JSON.stringify(flog),
      headers: {
        "Content-Type":"application/json; charset=utf-8"
      }
    }).then(res=> res.text())
      .then(res=> {
        if(res === "ok") {
          alert("새로운 블로그가 생성되었습니다!");
        } else{
          alert("블로그 생성 실패");
        }
      });   
  }

  const ChangeValue = (e) => {
    setFlog({ ...flog, [e.target.name]: e.target.value });
  }

  return (
    <FlogBoxStyle>
    <FloglistStyle>
      {flogs.map((flog)=>(
        <FlogStyle>
        <Flogimage src="images/background.jpg"></Flogimage>
        <div>Flog :{flog.flog_name}</div><button>신청하기</button>  
        </FlogStyle>
      ))}
      
      </FloglistStyle>
    <FlogWriteStyle>
    <JoinButtonStyle id="createBtn" onClick={CreateFlogBtn}>블로그생성</JoinButtonStyle> 
    <div id="createFlog" style={{display:"none"}}>
      <JoinStyle>
        <JoinButtonStyle onClick={CreateFlogBtn}>닫기</JoinButtonStyle>
            <JoinSubTitleStyle>블로그 이름</JoinSubTitleStyle>
            <JoinInputStyle type="text" name="flog_name" onChange={ChangeValue}/>
            <JoinSubTitleStyle>블로그 가훈</JoinSubTitleStyle>
            <JoinInputStyle type="text" name="flog_motto"onChange={ChangeValue}/>
            <JoinSubTitleStyle>블로그 이미지</JoinSubTitleStyle>
            <JoinInputStyle type="text" name="flog_img" onChange={ChangeValue}/>
            <JoinButtonStyle type="submit" onClick={FlogSaveBtn}>블로그생성</JoinButtonStyle>
            
        </JoinStyle>
    </div>
      </FlogWriteStyle>
  
      </FlogBoxStyle>
  );
};

export default FlogList;
import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const FormStyle = styled.div`
    display: grid;
    grid-template-columns: auto auto;
     justify-content: end;
     position: relative;
  `;

const JoinBackgroundStyle = styled.div`
min-height:680px;
`;

  const JoinStyle = styled.div`
    display:grid;
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
const JoinMainTitleStyle = styled.td`
    padding: 10px 0;
    font-size: 22px;
    font-weight: 600;
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
  const JoinButtonStyle = styled.button`
    background-color: black;
    color: white;
    width: 200px;
    height: 25px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    margin-top: 20px;
    font-family: 'Cafe24Simplehae';
  `;
  

const Join = (props) => {

  const [member, setMember] = useState({
    username: "",
    password: "",
    nickname: "",
    profile_image:"notfoundimage.jpg"
  });

  function createMember(e){

    e.preventDefault(); //submit 되지마라
    fetch("http://localhost:8000/join",{
      method:"POST",
      body: JSON.stringify(member),
      headers:{
        'Content-Type':"application/json; charset=utf-8"
      }
    }).then(res=>res.text())
    .then((res)=>{
      if(res === "ok"){
        alert("회원가입이 완료되었습니다.");
        props.history.push("/login");
      } else {
        alert("회원가입 실패!");
      }
      
    });
  }

  const inputHandle = (e) => {
    setMember({ ...member, 
      [e.target.name]: e.target.value });
  }
    
  return (
    
    <FormStyle>
      <JoinBackgroundStyle>
      <JoinStyle>
<JoinMainTitleStyle>여기는 가족블로그</JoinMainTitleStyle><br></br>
  <JoinSubTitleStyle >아이디</JoinSubTitleStyle>
         <JoinInputStyle type="text" name="username" onChange={inputHandle}/>
         <JoinSubTitleStyle >닉네임</JoinSubTitleStyle>
         <JoinInputStyle type="text" name="nickname"onChange={inputHandle}/>
  <JoinSubTitleStyle >비밀번호</JoinSubTitleStyle>             
       <JoinInputStyle type="password" name="password" onChange={inputHandle}/>
        <JoinSubTitleStyle >비밀번호 확인</JoinSubTitleStyle>             
       <JoinInputStyle type="password" name="password2" />
        <JoinButtonStyle onClick={createMember} >회원가입하겠습니다.</JoinButtonStyle>
          </JoinStyle>
          </JoinBackgroundStyle>
    </FormStyle>
  );
};

export default Join;
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { login } from '../../store';

const FormStyle = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    justify-content: end;
    position: relative;
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
const JoinBackgroundStyle = styled.div`
min-height:680px;
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
    width: 70px;
    height: 25px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    margin-top: 20px;
    font-family: 'Cafe24Simplehae';
  `;

const Login = (props) => {
  
  const dispatch = useDispatch();
  

  const [member, setMember] = useState({
    username: "",
    password: "",
  });
  
  const [user, setUser] = useState({});

  const loginBtn = (e) => {    
      e.preventDefault();
      fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          'Content-Type': "application/json; charset=utf-8"
        }, body: JSON.stringify(member)
      }).then(res => {

        // 로컬스토리지에 로그인정보를 저장함.
        for (let header of res.headers.entries()) {
          if (header[0] === "Authorization") {
            localStorage.setItem("Authorization", header[1]);
          }
        }
        return res.text();
      }).then(res => {

        if(res==="ok"){ // ==두개는 값비교 === 세개는 값과 타입비교
          dispatch(login());
          alert(member.username+"님 환영합니다!");
          props.history.push("/floglist"); //라우터에서 역사를 찾아서 푸쉬를 하면 URL 이동가능
          fetch("http://localhost:8000/user/"+member.username, {
			method: "GET",
			headers:{
				"Authorization": localStorage.getItem("Authorization")
			}
		}).then(res=>res.json()).then(res=>{
      setUser(res); 
      
      localStorage.setItem("user",JSON.stringify(res));
      console.log(res);
      console.log("flog정보 확인"+res.flog)
      if(res.flog === null){
        props.history.push("/floglist"); //라우터에서 역사를 찾아서 푸쉬를 하면 URL 이동가능
      
      }else{
        props.history.push("/boardlist"); //라우터에서 역사를 찾아서 푸쉬를 하면 URL 이동가능
      }
        });
          //push는 이전페이지를 기억하고  replace는 초기값으로 되돌림.
        } else {
          alert("아이디 혹은 비밀번호가 틀렸습니다!");
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
        <JoinSubTitleStyle >아이디</JoinSubTitleStyle>
        <JoinInputStyle type="text" name="username" value={member.username} onChange={inputHandle} />
        <JoinSubTitleStyle >비밀번호</JoinSubTitleStyle>
        <JoinInputStyle type="password" name="password" value={member.password} onChange={inputHandle} />
        <JoinButtonStyle type="submit" onClick={loginBtn}>로그인</JoinButtonStyle>
      </JoinStyle>
      </JoinBackgroundStyle>
    </FormStyle>
  );
};

export default Login;
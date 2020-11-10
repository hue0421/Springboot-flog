import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const HeaderStyle = styled.div`
position: sticky;
z-index:1;
top:0;
background-color: white;
border-bottom: solid 1px;
`;

const NavStyle = styled.div`
    display: grid;
    grid-template-columns: auto auto;
     justify-content: end;
  
  `;
  const MenuStyle = styled.ul`
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 10px;
    list-style-type: none;
    color: white;
    font-weight: 800;
    
  `;

const Header = () => {

  const isLogin = useSelector((store) => store.isLogin);
  const dispatch = useDispatch();

  const logoutProc = () => {
    localStorage.removeItem("Authorization");
    dispatch(logout());
  }

  return (
    <HeaderStyle>
    <NavStyle>
      <MenuStyle>
      {isLogin ? 
        (
        <>
          <li>
             
          </li>        
          <li>
            <Link onClick={logoutProc} style={{ textDecoration: "none", color: "black" }}>로그아웃</Link>  
          </li>
        </>
        )
        :
        (
        <>          
            <li>
              <Link to="/join" style={{ textDecoration: "none", color: "black" }}>회원가입</Link>
            </li>

            <li>
                <Link to="/login" style={{ textDecoration: "none", color: "black" }}>로그인</Link>
            </li>                   
        </>
        )
      }
          </MenuStyle>
    </NavStyle>
</HeaderStyle>
  );
};

/*
    style={ textDecoration: "none", color: "black" }
*/

export default Header;

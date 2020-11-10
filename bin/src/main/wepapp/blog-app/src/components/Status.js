import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

const StatusStyle = styled.div`
    display: grid;
    position: relative;
    width:240px;
  `;
const SubStatusStyle = styled.div`
    position:fixed;
`;
const UserStyle = styled.div`
    display :grid;
    grid-template-columns: 1fr 2fr ;
    width: 200px;
    height: 45px;
    background-color: honeydew;
    position: relative;
    border-radius: 6px;
    padding: 20px 15px;
    margin:5px 0 10px 10px;
    box-shadow: 0 8px 8px 0 rgb(214, 214, 214);
    
`;
const UserImgStyle = styled.img`
width:50px;
height:50px;
border-radius:30px;
`;

const UserTextStyle = styled.div`
display : grid;
grid-template-rows : auto auto;
font-weight:800;

`;
const NicknameStyle = styled.div`
margin : 5px 5px 0 0;
`;

const UserCardStyle = styled.div`
display : grid;
grid-template-columns: 2fr 1fr 1fr;
`;

const StatusText = styled.div`
font-size:12px;
`;

const Status = () => {
    return (
        <StatusStyle>
            <SubStatusStyle>
            <UserStyle>
            <UserImgStyle src="../images/logo.jpg"/>
            <UserTextStyle>
            <UserCardStyle>     
            <NicknameStyle>제준서</NicknameStyle>    
            <div className="emotion">😭</div>
            <div className="UserStatus">🟢</div>
            </UserCardStyle>
            <StatusText>안녕하세요 준서에요asdfasdsadas</StatusText>
            </UserTextStyle>
            </UserStyle>
            <UserStyle>
            <UserImgStyle src="../images/logo.jpg"/>
            <UserTextStyle>
            <UserCardStyle>     
            <NicknameStyle>제준서</NicknameStyle>    
            <div className="emotion">😭</div>
            <div className="UserStatus">🟢</div>
            </UserCardStyle>
            <StatusText>안녕하세요 준서에요asdfasdsadas</StatusText>
            </UserTextStyle>
            </UserStyle>
            </SubStatusStyle>
        </StatusStyle>
    );
};

export default Status;
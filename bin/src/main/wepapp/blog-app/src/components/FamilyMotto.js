import React from 'react';
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
    max-width: 700px;
    padding:10px;
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
`;

const FamilyMotto = () => {

	return (
        <MottoBoxStyle>
		<MottoStyle>
			<TitleStyle>우리🐸집 가훈</TitleStyle>
            <StatusText>
            한 우물을 파야 결실이 있다.ㄴㅁㅇㅁㄴㅇㄴㅇ
            </StatusText>
		</MottoStyle>
        </MottoBoxStyle>
	);
};

export default FamilyMotto;
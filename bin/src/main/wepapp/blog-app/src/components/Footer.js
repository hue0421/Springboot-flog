import React from 'react';
import styled from "styled-components";

const FooterStyle = styled.div`
  border-top: solid 1px;
  line-height:120%;
  margin-top:20px;
  width:100%;
  position:relative;
  background: white;
  text-align: center;
  color: black;
`;




const Footer = () => {
  return (
    <div>
<FooterStyle>
 <div>고객센터</div>
  <div>  전화 : 055-5555-5555</div>
  <div> 팩스 : 02-2222-2222</div>
  <div> 이메일 : jejunseo94@naver.com</div>
  <div> 카카오톡 ID : plus7878</div>
  <div> 요구사항 자유롭게 연락주시면 됩니다.</div>
</FooterStyle>
</div>
  );
};

export default Footer;

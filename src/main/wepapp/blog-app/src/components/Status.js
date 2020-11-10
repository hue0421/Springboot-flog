import userEvent from '@testing-library/user-event';
import React, { memo,useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';

const StatusStyle = styled.div`
    display: grid;
    position: relative;
    width:240px;
    text-align:center;
  `;
const SubStatusStyle = styled.div`
    position:fixed;
`;
const UserStyle = styled.div`
    display :grid;
    grid-template-columns: 1fr 2fr ;
    width: 250px;
    height: 75px;
    background-color: honeydew;
    position: relative;
    border-radius: 6px;
    padding: 20px 15px;
    margin:5px 0 0px 10px;
    box-shadow: 0 8px 8px 0 rgb(214, 214, 214);
    &:hover {
      background-color: white;
    }
    
`;
const UserImgStyle = styled.img`
width:80px;
height:80px;
border-radius:35px;
`;
const UserImgStyle2 = styled.label`
width:80px;
height:80px;
border-radius:40px;
cursor: pointer;
`;

const UserTextStyle = styled.div`
display : grid;
grid-template-rows : auto auto;
font-weight:800;
border: ridge 5px;
`;

const UserTextSetStyle = styled.div`
display : grid;
grid-template-rows : auto auto;
font-weight:500;
`;
const NicknameStyle = styled.div`
margin : 5px 5px 0 0;
`;
const NicknameStyle2 = styled.input`
margin : 5px 5px 0 0;
width: 50px;
`;
const UserCardStyle = styled.div`
display : grid;
grid-template-columns: 2fr 1fr 1fr;
`;

const StatusText = styled.div`
font-size:15px;
`;

const StatusText2 = styled.input`
width:150px;
font-size:12px;
`;

const CloseBtnStyle = styled.button`
   background-color: black;
   margin-left: 670px;
   margin-top:50px;
    color: white;
    height: 25px;
   width:100px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
`;
//수락버튼
const AcceptBtnStyle = styled.button`
   background-color: green;
   margin-left: 670px;
   margin-top:50px;
    color: white;
    height: 25px;
   width:100px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
`;
//거절버튼
const RejectBtnStyle = styled.button`
   background-color: red;
   margin-left: 670px;
   margin-top:50px;
    color: white;
    height: 25px;
   width:100px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
`;

//가입요청 알람창
const AccessBox = styled.div`
    width:200px;
    height:50px;
    display: flex;
    justify-content:center;
    align-items:center;
    margin: 10px 10px;
    background-color:#7BF7FD;
`;
//가입요청모달 스타일
const AccessModalStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
const AccessListStyles = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;
const AccessListBox = styled.div`
    
`;



const Status = () => {
    
    JSON.parse(localStorage.getItem("user"));
    console.log(JSON.parse(localStorage.getItem("user")));
    const [AccessmodalIsOpen,setAccessIsOpen] = useState(false);
    const AccessopenModal = () => {
        
        setAccessIsOpen(true);
    }
    const AccessafterOpenModal = () => {
    }
    const AccesscloseModal = () => {
        setAccessIsOpen(false);
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const usermno = user.mno
    console.log(usermno);
    const [updateUser, setUpdateUser] = useState({
        mno: usermno,
        nickname: "",
        profile_image: "",
        emotion: "",
        home_io: "",
        state_message: ""
        });
     const [accesses,setAccesses] = useState([]);

        useEffect(()=>{
            
        fetch("http://localhost:8000/user/"+user.username, {
            method: "GET",
         headers:{
                "Authorization": localStorage.getItem("Authorization")
         }
      }).then(res=>res.json()).then(res=>{
            setUpdateUser(res); 
        });

        fetch("http://localhost:8000/access/"+user.flog.fno,{
            method: "GET",
         headers:{
                "Authorization": localStorage.getItem("Authorization")
         }
        }).then(res=> res.json()).then(res=>{
            setAccesses(res);
        })
        setMembers(user.flog.member);
        
    },[]);
        
    
    const [members, setMembers] = useState([]);

    //setMembers(user.flog.member); 
    console.log(user.flog.member);
    
    const changeValue = (e)=> {
      setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
      console.log(e.target.value);
    }   
    
    const accept = (ano)=>{
        fetch("http://localhost:8000/access/"+ano,{
            method: "Post",
         headers:{
                "Authorization": localStorage.getItem("Authorization")
         }
        }).then(res=> res.text()).then(res=>{
            if(res === "ok"){
                alert("수락완료했습니다");
            }else{
                alert("수락실패했습니다");
            }
        });
        AccesscloseModal();
    }

    const reject = (ano)=>{
        fetch("http://localhost:8000/access/"+ano,{
            method: "Delete",
         headers:{
                "Authorization": localStorage.getItem("Authorization")
         }
        }).then(res=> res.text()).then(res=>{
            if(res === "ok"){
                alert("거절완료했습니다");
            }else{
                alert("거절실패했습니다");
            }
        })
    }


    const CreateFlogBtnStart = (props) => {
        var userStatusOut = document.querySelector("#userStatusOut");
        console.log("요청리스트 확인중:",accesses);

        if(userStatusOut.style.display=="none"){
        userStatusOut.style.display="grid";
        alert("프로필을 수정해보세요!");
        alert("프로필을 다시 클릭하시면 저장됩니다!");
         }else if(userStatusOut.style.display=="grid"){
        userStatusOut.style.display="none";

        let form = document.getElementById("form2");
        const formData = new FormData(form);
        
        fetch("http://localhost:8000/user/"+updateUser.mno, {
         method: "POST",
         body: formData
      }).then(res => res.text())
      .then(res => {
         if(res === "ok"){
                alert("프로필 수정성공!");
                window.location.reload();
         } else {
            alert("수정 실패");
         }
      });
      
          }else{}
         }


    return (
        
        <StatusStyle>
            <Modal
            isOpen={AccessmodalIsOpen}
            onAfterOpen={AccessafterOpenModal}
            onRequestClose={AccesscloseModal}
            style={AccessModalStyles}
            contentLabel="modal"
            >
              {accesses.map((access)=>(

                  <AccessListBox>
                    <AccessListStyles>
                    <div>{access.member.nickname}님이 가입요청 하셨습니다!</div>
                     </AccessListStyles>
                    <AcceptBtnStyle onClick={()=>accept(access.ano)}>수락</AcceptBtnStyle>
                  <RejectBtnStyle onClick={()=>reject(access.ano)}>거절</RejectBtnStyle>
                  </AccessListBox>
                  
                  
                  
                  ))}
              
              <CloseBtnStyle onClick={AccesscloseModal}>close</CloseBtnStyle>
              
    </Modal>
            <SubStatusStyle>
            <form id="form2" >
            <input name="mno" value={updateUser.mno} hidden></input>
            <UserStyle id="userStatusOut" style={{display:"none"}}>
            <UserImgStyle2 for="file" ><UserImgStyle src="images/profileimages/notfoundimage.jpg"/></UserImgStyle2>
            <input style={{display:"none"}} name="profile_image" onChange={changeValue} id="file" type="file"/>
            <UserTextSetStyle>
            <UserCardStyle >     
            <NicknameStyle2 placeholder="닉네임" type="text" name="nickname" value={updateUser.nickname} onChange={changeValue}></NicknameStyle2>    
            <select className="emotion" name="emotion" value={updateUser.emotion} onChange={changeValue} >
                <option value="😐">😐</option>
                <option value="😍">😍</option>
                <option value="🤬">🤬</option>
                <option value="🤓">🤓</option>
                <option value="🤑">🤑</option>
                <option value="😭">😭</option>
                <option value="🤧">🤧</option>
                <option value="😇">😇</option>
                <option value="😈">😈</option>
                <option value="🤡">🤡</option>
                <option value="🤓">🤓</option>
            </select>
            <select className="UserStatus"  name="home_io" value={updateUser.home_io} onChange={changeValue}>
                <option value="🟢">🟢</option>
                <option value="⚪">⚪</option>
                </select>
            </UserCardStyle>
            <StatusText2 placeholder="상태메시지" type="text" name="state_message" value={updateUser.state_message} onChange={changeValue}></StatusText2>
            </UserTextSetStyle>
            </UserStyle>
            </form>
            
            <AccessBox onClick={AccessopenModal}>
            <img src={"images/bell.png"} height="30px"/>  
            요청수: {accesses.length}
            </AccessBox>
            <UserStyle onClick={CreateFlogBtnStart}>
            <UserImgStyle name="profile_image" src={"images/profileimages/"+updateUser.profile_image}/>
            
            <UserTextStyle>
            <UserCardStyle>     
    <NicknameStyle name="nickname">{updateUser.nickname}</NicknameStyle>    
            <div className="emotion" name="emotion">{updateUser.emotion}</div>
    <div className="UserStatus" name="home_io">{updateUser.home_io}</div>
            </UserCardStyle>
    <StatusText name="state_message">{updateUser.state_message}</StatusText>
            </UserTextStyle>
            </UserStyle>

        {members.map((member) => ( 
            member.username===updateUser.username ? "" : 
            <UserStyle>
                   <UserImgStyle name="profile_image" src={"images/profileimages/"+member.profile_image}/>
                   <UserTextStyle>
                   <UserCardStyle>     
                   <NicknameStyle name="nickname">{member.nickname}</NicknameStyle>    
                   <div className="emotion" name="emotion">{member.emotion}</div>
                   <div className="UserStatus" name="home_io">{member.home_io}</div>
                   </UserCardStyle>
                     <StatusText name="state_message">{member.state_message}</StatusText>
                   </UserTextStyle>
            </UserStyle>
            ))}
            </SubStatusStyle>
        </StatusStyle>
    );
};

export default Status;
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Link } from "react-router-dom";
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import moment from 'moment';


const ChatStyle = styled.div`
    display:grid;
    grid-template-rows: auto auto auto;
    position: relative;
    width:250px;
  `;

const SubChatStyle = styled.div`
 position: fixed;
 background-color:#EAEAEA;
 border-radius: 6px;
 padding: 15px 15px;
 box-shadow: 0 8px 8px 0 rgb(214, 214, 214);
 margin-right:150px;
 margin-top:70px;
 grid-template-rows : 4fr 1fr;
`;

const UserImgStyle = styled.img`
width:50px;
height:50px;
border-radius:30px;
display: block;
margin : auto;
`;
const UserStyle = styled.div`
    display :grid;
    grid-template-columns: 1fr 2fr ;
    width:250px;
    background-color: honeydew;
    position: relative;
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 5px 0 5px 0;
    &:hover {
      background-color: white;
    }
`;
const UserTextStyle = styled.div`
display : grid;
grid-template-rows : auto auto;
font-weight:800;
font-size:12px;
`;
const NicknameStyle = styled.div`
margin : 5px 5px 0 0;
width:60px;
`;

const UserCardStyle = styled.div`
display : grid;
grid-template-columns: 1fr 2fr;
`;

const StatusText = styled.div`
font-size:12px;
background-color: white;
margin: 5px 5px 5px 0;
border: 1px solid black;
width : 150px;
line-height: 150%;
word-break: break-all;
`;
const ChatButtonStyle = styled.button`
    background-color: black;
    color: white;
    height: 25px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    margin-top: 5px;
    font-family: 'Cafe24Simplehae';
    width:250px;
  `;
const DateStyle = styled.div`
margin : 5px 5px 0 0;
`;
const ChatTextStyle = styled.textarea`
width:250px;
`;
const UserChatStyle = styled.div`
display: inline-block;
position: relative;
`;

const CalendarBoxStyle = styled.div`
 position: fixed;
 background-color:#EAEAEA;
 border-radius: 6px;
 padding: 5px 10px 0px 0px;
 box-shadow: 0 8px 8px 0 rgb(214, 214, 214);
 margin: 400px 110px;
 font-weight: 800;
 cursor:pointer;
 
`;

const ScheduleText = styled.div`
font-size:13px;
background-color: honeydew;
margin: 5px 5px 5px 0;
border-radius: 6px;
width : 150px;
line-height: 150%;
word-break: break-all; 
`;

const CalendarStyle = styled.div`
background-color: #EAEAEA;
position: fixed;
padding: 5px 10px;
margin: 400px 1000px 0px 0px;
z-index:2;
`;

const modalStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
const WriteBtnStyle = styled.button`

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

Modal.setAppElement('#root');

const Chat = () => {

    const [schedule,setSchedule] = useState({
        s_name:"",
        s_date:"",
    })
    //시작시 임의로 값을 초기화해둬야 모달에 오류가 없음
    useEffect(()=>{
        fetch("http://localhost:8000/board/schedule/" + "1994-01-01", {
         method: "GET",
         headers:{
            "Authorization": localStorage.getItem("Authorization")
         }
      }).then(res=>res.json()).then(res=>{
            console.log(res);
         setSList(res);
        });
        var month = new Date().getMonth()+1;
       console.log('month:',month);
        fetch("http://localhost:8000/board/monthschedule/" + month.toString(), {
         method: "GET",
         headers:{
            "Authorization": localStorage.getItem("Authorization")
         }
      }).then(res=>res.json()).then(res=>{
            console.log(res);
         setMonthschedule(res);
        });


    },[schedule])

    var cb = document.querySelector("#cbcb");
    
    const CalendarBox = () =>{
        
        console.log(cb);
        console.log(cb.style.display);
        if(cb.style.display=="none"){
            cb.style.display="inline-block";
        }else if(cb.style.display=="inline-block"){
            cb.style.display="none";
            
        }else{
            
        }

    } 
    //달력에서 날 선택시 실행, tempdate값 설정 및 포맷 변경하고 일정모달 오픈함.
    const ClickDay = (v,e) =>{
        setTempDate({date:v});
        formatDate(v);
        
        openModal();
    }
    //모달 열려있는지 닫혀있는지 상태
    const [modalIsOpen,setIsOpen] = useState(false);
    //Calender클릭스 들어오는 날짜정보(날짜포맷을 바꾸기전 상태)
    const [tempdate,setTempDate] = useState({
        date: new Date(),
    });
    
    //일정추가할 때 fetch로 보내는 정보
  

    //오늘 날짜
    const [today,setToday] = useState({
        date: new Date(),
        month: "",
    })

    //이달의 일정
    const [monthschedule,setMonthschedule] = useState([]);
    //모달 열거나 열고난 뒤, 닫을때
    const openModal = () => {
        
        setIsOpen(true);
    }
    const afterOpenModal = () => {
        setSchedule({s_date : tempdate.date.toString()});
        loadScheduleList();
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    //날짜 형식 바꾸기
    const formatDate = (date) => {
     setTempDate({
         date: moment(date).format("YYYY-MM-DD")
     })
    };
    const [sList,setSList] = useState([]); //일정리스트

    

    
    //일정리스트 불러오기
    const loadScheduleList = () => {
        fetch("http://localhost:8000/board/schedule/" + tempdate.date.toString(), {
         method: "GET",
         headers:{
            "Authorization": localStorage.getItem("Authorization")
         }
      }).then(res=>res.json()).then(res=>{
            console.log(res);
         setSList(res);
        });
        console.log('불러오기=',tempdate.date.toString());
    }
    //일정추가
    const submitSchedule = (e) => {
      e.preventDefault();

        changeValue(e);
        //setSchedule({s_date : tempdate.date.toString()});
        
      fetch("http://localhost:8000/boardlist/addschedule", {
         method: "post",
         headers: {
            'Content-Type':"application/json; charset=utf-8",
            "Authorization": localStorage.getItem("Authorization")
         }, body: JSON.stringify(schedule)
      }).then(res=>res.text())
      .then((res)=> {
         if(res === "ok") {
            alert("일정이 추가되었습니다!");
            if(cb.style.display=="inline-block"){
                cb.style.display="none";}
         } else {
            alert("일정 등록실패");
         }

        });
        closeModal();
   }

    //일정추가에서 입력값 바뀔때 저장하는 메소드
    const changeValue = (e) => {
        
        console.log({...schedule, 
            [e.target.name]: e.target.value });
        setSchedule({...schedule, 
            [e.target.name]: e.target.value });
            //console.log(document.querySelector(".ql-editor").innerHTML);
            
    } 
   
  return (
      <div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="modal"
            >
                <h2>일정추가</h2>
                
                <h3>추가된 일정</h3>
                {sList.map((schedule)=>(
                    <div>일정: {schedule.s_name}</div>
                ))}
                <h3>추가</h3>
                <div>일정: <input type="text" name="s_name" id="s_name" onChange={changeValue}/></div>
                <WriteBtnStyle type="submit" onClick={submitSchedule}>추가하기</WriteBtnStyle>
                <input type="hidden" name="s_date" id="s_date" value={schedule.date}/>
                <div>date : {tempdate.date.toString()}</div>
                <button onClick={closeModal}>close</button>
            </Modal>
           <CalendarStyle id="cbcb" style={{display:"none"}}>
          <Calendar  onChange={formatDate} onClickDay={(v,e)=>ClickDay(v,e)}/>

          </CalendarStyle>
      <ChatStyle>
              <CalendarBoxStyle onClick={CalendarBox}><div>이 달의 일정</div>
              <ScheduleText>
              {monthschedule.map((s)=>(
                  <div>{s.s_date} {s.s_name}</div>
              ))}
              </ScheduleText>
              </CalendarBoxStyle>
          <SubChatStyle>
<UserChatStyle>
<UserStyle>
<UserImgStyle src="../images/logo.jpg"/>
    <UserTextStyle>
            <UserCardStyle>     
            <NicknameStyle>제준서</NicknameStyle>    
            <DateStyle>2020-10-27 10:17</DateStyle>
            </UserCardStyle>
            <StatusText>여기는 방명록 작성란입니다.아 오오오영ㅈㄷㄱ머져댝;ㅣㄴ멱ㄴㅇ먀;ㄱㅁ폄ㅍㄱsadsadsadsadsadasdsadasd</StatusText>
    </UserTextStyle>
</UserStyle>
<UserStyle>
<UserImgStyle src="../images/logo.jpg"/>
    <UserTextStyle>
            <UserCardStyle>     
            <NicknameStyle>제준서</NicknameStyle>    
            <DateStyle>2020-10-27 10:17</DateStyle>
            </UserCardStyle>
            <StatusText>여기는 방명록 작성란입니다.</StatusText>
    </UserTextStyle>
</UserStyle>
</UserChatStyle>
<ChatTextStyle placeholder="방명록을 작성해보세요." rows="3"></ChatTextStyle>
<ChatButtonStyle>방명록 남기기</ChatButtonStyle>
</SubChatStyle>
</ChatStyle>
</div>
  );
};

export default Chat;
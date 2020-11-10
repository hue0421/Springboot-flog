import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";   
import styled from "styled-components";
import Status from "../../components/Status";
import Chat from "../../components/Chat";
import 'react-calendar/dist/Calendar.css';
import FamilyMotto from '../../components/FamilyMotto';


const BoardStyle = styled.div`
display: grid;
grid-template-columns: auto auto auto;
justify-content: space-around;
min-height: 680px;
`;

const BoardListStyle = styled.div`
    display:grid;
    grid-template-rows : auto auto auto auto auto;
    background-color:#EAEAEA;
    grid-gap: 15px;
    position: relative;
    border-radius: 6px;
    padding: 20px 30px;
    box-shadow: 0 8px 8px 0 rgb(214, 214, 214);
    margin-bottom:30px;
  `;

const WriteStyle = styled.button`
    display:inline-block;
    margin-left: 500px;
    background-color: black;
    color: white;
    height: 25px;
    width:70px;
    padding:5px 15px;
    font-weight: 400;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
`;
const FlogimgStyle = styled.img`
max-width:500px; //보드이미지최대너비
`;


const BoardList = (props) => {

    let boardNo = props.match.params.bno;

    const [boards, setBoards] = useState([]);
        // 페이징은 아직 안했음.
    
    const [post, setPost] = useState({
        bno:"",
        title:"",
        content:"",
        reg_date:"",
        member: {
            mno:0
        }
    });
    
    /*
    // 로그인해야 게시물 등록/수정/삭제 가능.
    const isLogin = useSelector((store)=> store.isLogin);
    
    */
    useEffect(()=>{
        /*
		if(!isLogin){
			alert('로그인 후 이용할 수 있습니다.');
			props.history.push("/");  
		}
        */
        fetch("http://localhost:8000/board/" + boardNo, {
			method: "GET",
			headers:{
				"Authorization": localStorage.getItem("Authorization")
			}
		}).then(res=>res.json()).then(res=>{
			setPost(res); 
        });
        
        fetch("http://localhost:8000/boardList")
        .then((res)=>res.json())
        .then((res)=>{
            setBoards(res.content);
            }
        );
    
    },[]);

    const deleteBoard =(boardNo) => {
        
        fetch("http://localhost:8000/board/"+ boardNo, {
            method: "DELETE",
            headers: {
               "Authorization": localStorage.getItem("Authorization")
            }, body: JSON.stringify(post)
        }).then(res=>res.text())
        .then(res => {
            if (res === "ok") {
                alert("삭제성공!");
                props.history.push("/boardList");
            } else {
                alert("삭제실패");
            }
        }).catch((error) => {
                console.log(error);
            });
    }

    return (

        <div>
        <BoardStyle>
        <Status/>
        <div>
            <FamilyMotto/>
                <Link to={"/boardForm/"} style={{ textDecoration: "none", color: "white"}}>
            <WriteStyle>
                글쓰기
            </WriteStyle>
            </Link>
            {boards.map((board) => (    
            <BoardListStyle>
                <div>글제목: {board.title} </div>
                <FlogimgStyle src="images/background.jpg"/>
                <div dangerouslySetInnerHTML={ {__html: board.content} }></div>
                <div>작성일: {board.reg_date}</div>
                <div>작성자: 마스터</div>
                <Link to={"/updateForm/"+board.bno} style={{ textDecoration: "none", color: "black" }}>수정</Link>
                <button onClick={()=>deleteBoard(board.bno)}>삭제</button>
            </BoardListStyle>
            ))}
        
        </div>
        <Chat/>
        </BoardStyle>
        </div>
    );
}

export default BoardList;

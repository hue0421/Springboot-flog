  
import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";   
import styled from "styled-components";
import Status from "../../components/Status";
import Chat from "../../components/Chat";
import 'react-calendar/dist/Calendar.css';
import FamilyMotto from '../../components/FamilyMotto';
import { Pagination } from 'react-bootstrap';
import ReplyItem from "../../components/ReplyItem";
import Modal from 'react-modal';

const BoardStyle = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: space-around;
    min-height: 680px;
    margin-right:60px;
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
    display:grid;
    justify-content:  right;
    background-color: black;
    color: white;
    height: 25px;
    
    padding:5px 15px;
    font-weight: 400;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
`;
const FlogimgStyle = styled.img`
max-width:800px; //보드이미지최대너비
`;

const JoinButtonStyle = styled.button`
    background-color: black;
    color: white;
    height: 25px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
  `;
const BtnStyle = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    justify-content: right;
`;

const YesBtnStyle = styled.button`
	background-color: lightgray;
    color: white;
    height: 25px;
    width:70px;
    margin-left: 10px;
    margin-right:10px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
`;

const RepViewBtnStyle = styled.button`
    background-color: gray;
    color: white;
    height: 25px;
    width:70px;
    margin-left: 10px;
    margin-right:10px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
`;

const NoBtnStyle = styled.button`
    background-color: white;
    float: right;
    color: black;
    height: 25px;
	width:100px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
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

const BoardList = (props, {bno, content, title, reg_date}) => {

    //let boardNo = props.match.params.bno;

    const [boards, setBoards] = useState([]);
	const [last, setLast] = useState('');
	const [page, setPage] = useState(0);

    const [user,setUser]= useState({
        mno:null,
    });
	useEffect(() => {


    // flogList 페이징해서 화면에 표시.
        fetch("http://localhost:8000/boardlist?page="+page, {
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                setBoards(res.content);
                setLast(res.last);
        });
        setUser({...user,mno:JSON.parse(localStorage.getItem("user")).mno});

	}, [page]);


    // 1이지 앞으로.
        const prev = () =>{
            setPage(page-1);
        }

    // 1페이지 뒤로.
        const next = () =>{
            setPage(page+1);
    }


    // const [post, setPost] = useState({
    //     bno:"",
    //     title:"",
    //     content:"",
    //     reg_date:"",
    //     member: {
    //         mno:0
    //     }
    // });

    const [reply, setReply] = useState({
        rno:null,
    });

    const [replys, setReplys] = useState([]);

    const [board, setBoard] = useState({
        bno:null,
    
    });

    
    /*
    // 로그인해야 게시물 등록/수정/삭제 가능.
    const isLogin = useSelector((store)=> store.isLogin);
    
    */
    
    const deleteBoard =(boardNo) => {
        fetch("http://localhost:8000/board/"+ boardNo, {
            method: "DELETE",
            headers: {
               "Authorization": localStorage.getItem("Authorization")
            }
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

    const changeValue = (e)=> {
        setReply({...reply, 
             [e.target.name]: e.target.value });
             
        setBoard({...board, 
             [e.target.name]: e.target.value });     
    }


    const replyApplyBtn = (bno) =>{
    
        setBoard({...board,
            bno:bno, 
        });
    
        console.log('bno정보:',bno);
        openModal();
        
    }

    //모달 열려있는지 닫혀있는지 상태
    const [modalIsOpen,setIsOpen] = useState(false);
        const openModal = () => {
        
        setIsOpen(true);
    }
    const afterOpenModal = () => {
        
    }
    const closeModal = () => {
        setIsOpen(false);
    }


    const ReplyList = (bno) => {
        // setReplys({...replys,
        //     bno:bno, 
        // });

        var replySection = document.querySelector("#replySection");
        var replyOpen = document.querySelector("#replyOpen");

        if(replySection.style.display==="none"){
            replySection.style.display="grid";
            replyOpen.style.display="none";
                    
        }else if(replySection.style.display==="grid"){
            replySection.style.display="none";
            replyOpen.style.display="inline";
        }else{}

        fetch("http://localhost:8000/replyList/"+ board.bno, {
            method:"GET",
            headers:{
            "Authorization": localStorage.getItem("Authorization")
            }
        })
        .then((res)=>res.json())
        .then((res)=>{
            setReplys(res.content);
            console.log(res);
            }
        );
    }

    const ReplySave = () => {

        console.log('board정보:',board);
        fetch("http://localhost:8000/board/"+ board.bno + "/reply",{
        method:"post",
        headers: {
                    'Content-Type':"application/json; charset=utf-8",
                    "Authorization": localStorage.getItem("Authorization")
                },
        body: JSON.stringify(board)
        }).then(res => res.text())
        .then(res => {
        if(res==="ok"){
            alert("댓글등록이 완료되었습니다.");
        }else{
            alert("댓글등록 실패");
        }
    })
    
        closeModal();
    }

    return (

        <div>
        <BoardStyle>
        <Status/>

        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="modal"
        >
            <div>
                <h2>댓글</h2>
                <input type="text" name="content" placeholder="댓글입력" onChange={changeValue}/> 
                <YesBtnStyle onClick={ReplySave}>등록하기</YesBtnStyle>
                <RepViewBtnStyle id="replyOpen" onClick={()=>ReplyList(board.bno.rno)}>댓글보기</RepViewBtnStyle><br /><br />
                <div id="replySection" style={{display:"none"}}> 
                    댓글 : {reply.content}
                </div>
            <NoBtnStyle onClick={closeModal}>나가기</NoBtnStyle>
            </div>
        </Modal>

        <div>
            <FamilyMotto/>
            <BtnStyle>
                <Link to={"/boardForm/"} style={{ textDecoration: "none", color: "white"}}>
            <WriteStyle>
                글쓰기
            </WriteStyle>
            </Link>
            </BtnStyle>
            {boards.map((board) => (    
            <BoardListStyle>
                <div>글제목: {board.title}</div>
                <FlogimgStyle src="images/background.jpg"/>
                <div dangerouslySetInnerHTML={ {__html: board.content} }></div>
                <div>작성일: {board.reg_date}</div>
                <div>작성자: 마스터</div>

                <BtnStyle>
                <Link to={"/updateForm/"+board.bno} style={{ textAlign:"center",textDecoration: "none", backgroundColor:"black",borderRadius:"6px"}}>
                <JoinButtonStyle>수정</JoinButtonStyle></Link>
                <JoinButtonStyle onClick={()=>deleteBoard(board.bno)}>삭제</JoinButtonStyle>
                </BtnStyle>

                <JoinButtonStyle onClick={()=>replyApplyBtn(board.bno)}>댓글</JoinButtonStyle>
                
                {/* {replys.map(reply => <ReplyItem key={reply.rno} content={reply.content} reg_date={reply.reg_date} />)} */}
                {/* <h3>댓글</h3>                       
                <button id="replyOpen" onClick={()=>replyOpenBtn(board.bno)}>댓글열기↓</button>
                <div id="replySection"  style={{display:"none"}}>
                        <form id="form">
                            댓글 : {reply.content}<br />
                        </form>                 
                    <button onClick={replyClsoe}>닫기</button>
                </div>   */}
            </BoardListStyle>
            ))}
            
            <div>
            <br /><br /><br /><br />
				<Pagination>
					{page === 0 ? 
						<Pagination.Item onClick={prev} disabled>Prev</Pagination.Item> : 
						<Pagination.Item onClick={prev}>Prev</Pagination.Item>}
					{last === true ? 
						<Pagination.Item onClick={next} disabled>Next</Pagination.Item> : 
						<Pagination.Item onClick={next}>Next</Pagination.Item>}
				</Pagination>

			</div>
        </div>
        <Chat/>
        </BoardStyle>
        </div>
    );
}

export default BoardList;
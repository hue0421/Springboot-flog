import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import styled from "styled-components";

const BoardFormStyle = styled.div`
display:grid;
grid-template-rows: auto auto auto auto;
justify-content:center;
font-weight:600;
`;

const BoardInputStyle = styled.input`
	height: 25px;
    width: 100%;
    color: rgb(100, 100, 100);
    font-size: 12px;
    border: 1px solid rgb(230, 230, 230);
`;
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

const ReturnBtnStyle = styled.button`
	background-color: black;
	margin-left: 0px;
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

const UpdateForm = (props) => {
	const { quill, quillRef } = useQuill();

	let boardNo = props.match.params.bno;

	const [board, setBoard] = useState({
		title: "",
		content: ""
	});

	const UpdateBoard = (e) => {
		e.preventDefault();
		changeValue(e);

		fetch("http://localhost:8000/board/update/" + boardNo, {
			method: "PUT",
			headers: {
				"Content-Type":"application/json; charser=utf-8",
				"Authorization":localStorage.getItem("Authorization")
			}, body: JSON.stringify(board)
		}).then(res => res.text())
		.then(res => {
			if(res === "ok"){
				alert("게시글 수정 성공!");
				props.history.push("/boardList");
			} else {
				alert("수정 실패");
			}
		});
	}

	const changeValue = (e)=> {
		setBoard({ ...board, [e.target.name]: e.target.value });
		board.content= quill.root.innerHTML;
	}	

	useEffect(() => {
		fetch("http://localhost:8000/board/" + boardNo, {
			method: "GET",
			headers: {
				"Authorization":localStorage.getItem("Authorization")
			}
		}).then(res=>res.json())
		.then(res => {
			setBoard(res);
			var changeContent = res.content.replace(/(<([^>]+)>)/ig,"");  //자바스크립트 정규식으로 태그제거
			
			var boardC = document.createTextNode(changeContent);
         var qlEditor = document.querySelector(".ql-editor");
         console.log(boardC);
         qlEditor.appendChild(boardC);

		});
	}, []);
	
	const returnList = () => {
		props.history.push("/boardList")
	}

	return (
		<BoardFormStyle>
			<h1>글 수정하기</h1>

			<div>
			제목 <BoardInputStyle type="text" name="title" value={board.title} onChange={changeValue} />
			</div>
			<div>내용
			<div  style={{ height: 300 }}>
      				<div ref={quillRef}/>
				</div>
			</div>
			<div>
			<ReturnBtnStyle onClick={returnList}>돌아가기</ReturnBtnStyle>
			<WriteBtnStyle variant="primary" type="submit" onClick={UpdateBoard}>수정하기</WriteBtnStyle>
			</div>
		</BoardFormStyle>
	);
};

export default UpdateForm;

import React, {useState} from 'react';
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

const BoardForm = (props) => {

 const { quill, quillRef } = useQuill();
 
  //console.log(quill);    // undefined > Quill Object
  //console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

  
  

  const [board, setBoard] = useState({
	  title: "",
	  content:""
	});


	const submitBoard = (e) => {
		e.preventDefault();

		changeValue(e);
	
		fetch("http://localhost:8000/write", {
			method: "post",
			headers: {
				'Content-Type':"application/json; charset=utf-8",
				"Authorization": localStorage.getItem("Authorization")
			}, body: JSON.stringify(board)
		}).then(res=>res.text())
		.then((res)=> {
			if(res === "ok") {
				alert("게시글이 등록되었습니다!");
				props.history.push("/boardList");
			} else {
				alert("게시글 등록실패");
			}

		});
	}

	 const changeValue = (e) => {
		 document.querySelector(".ql-editor").setAttribute('name','content');
		
		board.content= quill.root.innerHTML;
		
	 	//console.log(board.title);
	 	//console.log(board.content);
	 	console.log({...board, 
	 		[e.target.name]: e.target.value });
	 	setBoard({...board, 
	 		[e.target.name]: e.target.value });
	 		//console.log(document.querySelector(".ql-editor").innerHTML);
	 } 
 
	return (

		<BoardFormStyle>
			<h1>글쓰기</h1>

			<div>
			제목 <BoardInputStyle type="text" name="title" id="title" onChange={changeValue}  />
			</div>
			<div>내용
				<div  style={{ height: 300 }}>
      				<div ref={quillRef} />
				</div>
			</div>
			<div>
			<WriteBtnStyle type="submit" onClick={submitBoard}>등록하기</WriteBtnStyle>
			</div>
		</BoardFormStyle>

	);
};

export default BoardForm;
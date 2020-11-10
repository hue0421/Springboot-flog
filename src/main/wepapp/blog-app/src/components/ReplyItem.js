import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ReplyItem = ({rno, bno, content, reg_date}) => {

	const [replys, setReplys] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8000/replyList/" + bno, {
			method: "GET"
		}).then(res => res.json())
			.then(res => {
				console.log(res);
				setReplys(res.content);
			});
	}, []);


	const replyOpenBtn = (boardNo) => {
        
        var replySection = document.querySelector("#replySection");
        var replyOpen = document.querySelector("#replyOpen");

        if(replySection.style.display==="none"){
			replySection.style.display="grid";
			replyOpen.style.display="none";
                    
        }else if(replySection.style.display==="grid"){
			replySection.style.display="none";
			replyOpen.style.display="inline";
        }else{}
        console.log(boardNo)

        fetch("http://localhost:8000/replyList/" + bno, {
        	method:"GET",
        	headers:{
        		"Authorization": localStorage.getItem("Authorization")
        	}
		})
		.then((res)=>res.json())
		.then((res)=>{
			setReplys(res.content);
			console.log(res);
		});
    }

    const replyClsoe = () => {
        var replySection = document.querySelector("#replySection");
        var replyOpen = document.querySelector("#replyOpen");
        if(replySection.style.display==="none"){
        replySection.style.display="grid";
        replyOpen.style.display="none";

        }else if(replySection.style.display==="grid"){
        replySection.style.display="none";
        replyOpen.style.display="inline";
        }else{

        }  
    }

	return (
		<div>
			<h3>{replys.rno}댓글</h3>                       
            <button id="replyOpen" onClick={()=>replyOpenBtn(replys.bno)}>댓글열기↓</button>
            <div id="replySection"  style={{display:"none"}}>
                <form id="form">
                    댓글 : {replys.content}<br />
					등록일 : {replys.reg_date}<br />
                </form>                 
                <button onClick={replyClsoe}>닫기</button>
            </div>  
		</div>
	);
};

export default ReplyItem;
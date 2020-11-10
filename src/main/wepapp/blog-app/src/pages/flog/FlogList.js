import React, { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import { Pagination } from 'react-bootstrap';

const FlogStyle = styled.div`
    grid-template-columns: auto;
    background-color: #EBF7FF;
    grid-gap: 15px;
    position: relative;
    border-radius: 6px;
    padding: 20px 30px;
    box-shadow: 0 8px 8px 0 #D9E5FF;
    &:hover {
      background-color: white;
    }
`;

const Flogimage = styled.img`
  width:130px;
  height:100px;
`;

const FlogBoxStyle = styled.div`
display: grid;
grid-template-columns: 2fr 1fr;
`;


const FloglistStyle = styled.div`
display : grid;
grid-template-columns: auto auto auto auto auto;
width:200px;
height:200px;
grid-gap : 10px; 
`;

const FlogWriteStyle = styled.div`
display : fixed;
justify-content : end;
margin-right: 10px;

`;

const JoinButtonStyle = styled.button`
  background-color: black;
  color: white;
  width: 100%;
  height: 25px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 6px;
  border: 0;
  cursor: pointer;
  font-family: 'Cafe24Simplehae';

`;

const YesBtnStyle = styled.button`

	  background-color: green;
    color: white;
    height: 25px;
    width:100px;
  margin-right:100px;
    font-size: 15px;
    font-weight: 400;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    font-family: 'Cafe24Simplehae';
`;
const NoBtnStyle = styled.button`

	background-color: red;

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

const JoinSubTitleStyle = styled.td`
    padding: 10px 0;
    font-size: 15px;
    font-weight: 600;
  `;
const JoinInputStyle = styled.input`
    height: 25px;
    width: 100%;
    color: rgb(100, 100, 100);
    font-size: 12px;
    border: 1px solid rgb(230, 230, 230);
  `;
 const JoinStyle = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-content: end;
  width: 200px;
  display: inline-block;
  background-color: white;
  position: relative;
  border-radius: 6px;
  padding: 20px 30px;
  box-shadow: 0 8px 8px 0 rgb(214, 214, 214);
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

const FlogList = ({fno, flog_name, flog_img}) => {

  const [flogs, setFlogs] = useState([]);
	const [last, setLast] = useState('');
	const [page, setPage] = useState(0);

	useEffect(() => {

    // flogList 페이징해서 화면에 표시.
		fetch("http://localhost:8000/floglist?page="+page, {
			method: "GET"
		}).then(res => res.json())
			.then(res => {
				console.log(res);
				setFlogs(res.content);
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


  const CreateFlogBtn = () => {
    var createFlog = document.querySelector("#createFlog");
    var createBtn = document.querySelector("#createBtn");
    if(createFlog.style.display=="none"){
      createFlog.style.display="grid";
      createBtn.style.display="none";
      
    }else if(createFlog.style.display=="grid"){
      createFlog.style.display="none";
      createBtn.style.display="inline";
    }else{}
  
  }

  const [flog, setFlog] = useState({
    fno:"",
    flog_name:"",
    flog_motto:"",
    flog_img:""
  });
  const [user,setUser]= useState({
   mno:null,
  });
  const [access,setAccess] = useState({
    mno:null,
    
    fno:null
  });
 
 
  //가입신청함수
  const joinApplyFlog = (fno) =>{
    
    setAccess({...access,
      fno:fno, 
      mno:user.mno
    });
   
    // setTimeout(()=>{
    //   setAccess({...access,
    //     fno:fno,
    //     mno:user.mno
    //   });
    // },50000);
    // setStateAsync({...access,
    //   fno:fno,
    //   mno:user.mno
    // });
    // test();
    console.log('fno정보:',fno);
    console.log('access정보:',access);
    console.log('user정보:',user.mno);
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


  const joinFetch = () => {

    console.log('access정보:',access);
    fetch("http://localhost:8000/join_flog",{
      method:"post",
      headers: {
				'Content-Type':"application/json; charset=utf-8",
				"Authorization": localStorage.getItem("Authorization")
			},
      body: JSON.stringify(access)
    }).then(res => res.text())
    .then(res => {
      if(res==="ok"){
        alert("블로그 신청이 완료되었습니다.");
      }else{
        alert("블로그 신청 실패");
      }
    })
    
    closeModal();

  }

  const FlogSaveBtn = (e) =>{
    e.preventDefault();
    let form = document.getElementById("form");
    const formData = new FormData(form);
    fetch("http://localhost:8000/create_flog/"+JSON.parse(localStorage.getItem("user")).mno, {
      method:"post",
      body: formData
    }).then(res=> res.text())
      .then(res=> {
        if(res === "ok") {
          alert("새로운 블로그가 생성되었습니다!");

          //props.history.push("/boardlist");
        } else{
          alert("블로그 생성 실패");
        }
      });   
  }

  const ChangeValue = (e) => {
    setFlog({ ...flog, [e.target.name]: e.target.value });
    console.log(e.target.value)
  }
  

  const searchBtn=(e)=>{
    e.preventDefault();
  }

  return (
  
    <FlogBoxStyle>
      <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="modal"
            >
              <h2>정말로 추가하시겠습니까??</h2>
              <YesBtnStyle onClick={joinFetch}>네</YesBtnStyle>
              <NoBtnStyle onClick={closeModal}>아니요</NoBtnStyle>
              
    </Modal>
    <FloglistStyle>

       {/* flogList를 화면에 뿌려줄 map */}
      {flogs.map((flog)=>(
        <FlogStyle>
        <Flogimage src={"images/flogimages/"+flog.flog_img}  ></Flogimage>
        <div>{flog.flog_name}</div><JoinButtonStyle onClick={()=>joinApplyFlog(flog.fno)}>가입신청하기</JoinButtonStyle>  
        </FlogStyle>

      ))}
        
      {/* 페이지 Section */}
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

    </FloglistStyle>
    <FlogWriteStyle>
    <input type="text" name="searchFlog"/>
    <button type="submit" onClick={searchBtn}>검색</button>
    <JoinButtonStyle id="createBtn" onClick={CreateFlogBtn}>블로그생성</JoinButtonStyle> 
    <div id="createFlog" style={{display:"none"}}>
      <JoinStyle>
        <JoinButtonStyle onClick={CreateFlogBtn}>닫기</JoinButtonStyle>
            <form id="form" >
            <JoinSubTitleStyle>블로그 이름</JoinSubTitleStyle>
            <JoinInputStyle type="text" name="flog_name" onChange={ChangeValue}/>
            <JoinSubTitleStyle>블로그 가훈</JoinSubTitleStyle>
            <JoinInputStyle type="text" name="flog_motto"onChange={ChangeValue}/>
            <JoinSubTitleStyle>블로그 이미지</JoinSubTitleStyle>
            <JoinInputStyle type="file" name="flog_img" onChange={ChangeValue}/>
            </form>
            <JoinButtonStyle type="submit" onClick={FlogSaveBtn}>블로그생성</JoinButtonStyle>
        </JoinStyle>
    </div>
      </FlogWriteStyle>

    </FlogBoxStyle>
    
  );
};

export default FlogList;
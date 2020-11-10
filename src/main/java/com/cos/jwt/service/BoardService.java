package com.cos.jwt.service;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.jwt.domain.Calender.Calender;
import com.cos.jwt.domain.Calender.CalenderRepository;
import com.cos.jwt.domain.post.Board;
import com.cos.jwt.domain.post.BoardRepository;

import lombok.RequiredArgsConstructor;

//게시판 기능
@RequiredArgsConstructor
@Service
public class BoardService {

	@Autowired
	private BoardRepository boardRepository;
	
	@Autowired
	private CalenderRepository calenderRepository;
	
	
	@Transactional
	public void 글쓰기(Board board) {
		boardRepository.save(board);
	}
	
	@Transactional(readOnly = true)
	public Page<Board> 글목록(Pageable pageable){
		return boardRepository.findAll(pageable);
	}
	
/*
=======
>>>>>>> accb3a33f03e8bdb1a770a767f34df95c43cf491
	@Transactional(readOnly = true)
	public Page<Board> 글목록(Pageable pageable){
		return boardRepository.findAll(pageable);
	}
*/
	
//	@Transactional(readOnly = true)
//	public Page<Board> 글목록(Pageable pageable,int fno){
//		List<Board> boards = boardRepository.FindAllbyFno(fno);
//		return boardRepository.findAll(boards, pageable);
//		
//	}
	
	@Transactional(readOnly = true)
	public Page<Board> 글목록2(Pageable pageable){
		Page<Board> boards = boardRepository.findAll(pageable);
		String content;
		for(Board board: boards) {
			content = board.getContent();
			if(content != null)
				content.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
			board.setContent(content);
		}
		return boards;
	}
	
	@Transactional(readOnly = true)
	public Board 글상세보기(Pageable pageable,int bno){
		return boardRepository.findById(bno).get();
	}
	
	//글 수정시 태그 삭제하려했으나 리액트와 연동시 replaceAll이 작동하지 않아서 리액트의 자바스크립트 정규식을 사용해 태그삭제함.
	
//	@Transactional
//	public Board 글상세보기2(Pageable pageable,int bno){  //replaceAll이 작동하지 않음.
//		Board board = boardRepository.findById(bno).get();
//		String content = board.getContent();
//		if(content != null)
//			content.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
//		String test = "<p>실험!</p>";
//		test.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
//		test.replaceAll("!", "");
//		System.out.println("testContent:"+test);
//	
//		board.setContent(content);
//		return board;
//	}
	
	@Transactional
	   public void 글수정하기(int bno, Board board) {
	      Board boardEntity = boardRepository.FindByBno(bno);
	      boardEntity.setTitle(board.getTitle());
	      boardEntity.setContent(board.getContent());      
	   }
	
	@Transactional
	public void 글삭제하기(int bno) {
		boardRepository.DeleteByBno(bno);
	}
	
	//캘린더관련
	
	//그 날의 일정보기
	@Transactional
	public List<Calender> 일정보기(String s_date) {
		return calenderRepository.FindBySDate(s_date);
	}
	//이 달의 일정보기
	@Transactional
	public List<Calender> 이달의일정(String month) {
//		String month = s_date.substring(5, 6);
//		System.out.println("month:"+month);
		return calenderRepository.FindByMonth(month);
	}
	@Transactional
	public void 일정추가(Calender calender) {
		
		calenderRepository.save(calender);
	}
	
	
}

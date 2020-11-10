package com.cos.jwt.web;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.person.Member;
import com.cos.jwt.domain.person.MemberRepository;
import com.cos.jwt.domain.post.Board;
import com.cos.jwt.domain.post.BoardRepository;
import com.cos.jwt.domain.reply.Reply;
import com.cos.jwt.domain.reply.ReplyRepository;
import com.cos.jwt.service.FlogService;
import com.cos.jwt.service.ReplyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReplyController {
	
	   private final ReplyRepository replyRepository;
	   private final ReplyService replyService;
	   private final MemberRepository memberRepository;
	   private final BoardRepository BoardRepository;
	   
	   @PostMapping("/board/{bno}/reply")
	   public String 댓글쓰기(@RequestBody Reply reply, @PathVariable int bno) {
	      Member memberEntity = memberRepository.findById(1).get();
	      Board boardEntity = BoardRepository.findById(bno).get();
	      
	      reply.setMember(memberEntity);
	      reply.setBoard(boardEntity);
	      replyRepository.save(reply);
	      return "ok";
	   }
	   
	   @DeleteMapping("/reply/{rno}")
	   public String 댓글삭제(@PathVariable int rno, Reply reply) {
	      replyRepository.DeleteByRno(rno);
	      return "ok";
	   }
	   
	   @GetMapping("/replyList/{bno}") //글목록
	   public List<Reply> replyList(@PageableDefault(size = 5, sort = "rno") Pageable pageable, @PathVariable int bno){
	      List<Reply> replys = replyService.댓글목록(pageable, bno);
	      return replys;
	      
	   }
	   /*
	   @GetMapping("/reply/{bno}") //글상세보기 (글수정 시 정보 들고옴)
	   public Reply replyDetail(@PageableDefault(size = 5, sort = "bno") Pageable pageable,@PathVariable int bno){
	      Reply reply = replyService.댓글상세보기(pageable, bno);
	      return reply;
	   }
	   
	    */
}

  
package com.cos.jwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.post.Board;
import com.cos.jwt.domain.reply.Reply;
import com.cos.jwt.domain.reply.ReplyRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReplyService{
   
   @Autowired
   private ReplyRepository replyResitory;
   
   @Transactional(readOnly = true)
   public List<Reply> 댓글목록(Pageable pageable, int bno){
      return replyResitory.FindByBno(bno);
   }
   /*
   @Transactional(readOnly = true)
   public Reply 댓글상세보기(Pageable pageable,int bno){
      return replyResitory.FindByBno(bno);
   }
   */
}
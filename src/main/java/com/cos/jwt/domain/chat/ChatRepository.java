package com.cos.jwt.domain.chat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.post.Board;

public interface ChatRepository extends JpaRepository<Chat, Integer>{

//	@Query(value = "SELECT * FROM board WHERE bno = :bno",nativeQuery = true)
//	Board FindByBno(int bno);
	
}

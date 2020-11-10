package com.cos.jwt.web;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.jwt.domain.chat.Chat;
import com.cos.jwt.domain.chat.ChatRepository;
import com.cos.jwt.domain.post.Board;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class chatService {
private final ChatRepository chatRepository;
	
	@Transactional
	public void 방명록등록(Chat chat) {
		chatRepository.save(chat);
	}
	
	@Transactional(readOnly = true)
	public List<Chat> 방명록목록(){
		return chatRepository.findAll();
	}
}

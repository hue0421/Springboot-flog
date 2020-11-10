package com.cos.jwt.web;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cos.jwt.domain.chat.Chat;
import com.cos.jwt.domain.chat.ChatRepository;
import com.cos.jwt.domain.person.Member;
import com.cos.jwt.domain.post.Board;
import com.cos.jwt.service.BoardService;
import com.cos.jwt.service.MemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ChatController {
	private final chatService chatService;
	
	
	@PostMapping("chat_Write") //글쓰기
	public ResponseEntity<?> save(@RequestBody Chat chat) {
		chatService.방명록등록(chat);
		return new ResponseEntity<String>("ok", HttpStatus.CREATED);
	}
	
	@GetMapping("/chatList")
	public List<Chat> chatList(){
		List<Chat> chats = chatService.방명록목록();
		return chats;
		
	}
}

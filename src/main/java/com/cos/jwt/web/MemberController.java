package com.cos.jwt.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.person.Member;
import com.cos.jwt.service.MemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberController {

	private final MemberService memberService;
	private final HttpSession session;
	
	// 회원가입
	@PostMapping("/join")
	public ResponseEntity<?> save(@RequestBody Member member) {
		memberService.회원가입(member);
		return new ResponseEntity<String>("ok", HttpStatus.CREATED);
	}
	@GetMapping("/user/{username}")
	public Member user(@PathVariable String username) {
		return memberService.회원정보(username);
	}
	// 로그아웃
	@GetMapping("/logout")
	public ResponseEntity<?> logout() {
		session.invalidate();
		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}
	@PostMapping("/user/{mno}")
	public String updateProfile(HttpServletRequest request, MultipartFile profile_image, @RequestParam("nickname") String nickname,
			@RequestParam("emotion") String emotion,@RequestParam("home_io") String home_io,@RequestParam("state_message") String state_message,@RequestParam("mno") Integer mno) {
		System.out.println(request+nickname+ emotion+ home_io+ state_message+ mno);
		System.out.println(profile_image.getOriginalFilename());
		memberService.회원정보수정(request, profile_image, nickname, emotion, home_io, state_message, mno);
		return "ok";
	}
	

}
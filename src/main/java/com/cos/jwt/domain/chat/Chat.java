package com.cos.jwt.domain.chat;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.person.Member;
import com.cos.jwt.domain.post.Board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Chat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int chno;
	private String chat_content;
	@CreationTimestamp
	private Timestamp reg_date;
	
	@JoinColumn(name="mno")
	@ManyToOne //foreign key 설정
	private Member member;
}

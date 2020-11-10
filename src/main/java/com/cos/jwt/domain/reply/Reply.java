package com.cos.jwt.domain.reply;

import java.sql.Timestamp;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.cos.jwt.domain.access.Access;
import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.person.Member;
import com.cos.jwt.domain.post.Board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Reply {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int rno;
	@Column(length = 300)
	private String content;
	@CreationTimestamp
	private Timestamp reg_date;
	
	// Member의 mno 참조(FK)
	@ManyToOne
	@JoinColumn(name="mno")
	private Member member;
	
	// Board의 bno 참조(FK)
	@ManyToOne
	@JoinColumn(name="bno")
	private Board board;
	
	
}

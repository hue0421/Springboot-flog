package com.cos.jwt.domain.person;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.post.Board;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int mno;
	@Column(unique = true)
	private String username;
	private String password;
	private String nickname;
	private String profile_image;
	private String emotion;
	private String state_message;
	private String home_io;


	@JoinColumn(name="fno")
	@ManyToOne() //foreign key 설정
	private Flog flog;

}

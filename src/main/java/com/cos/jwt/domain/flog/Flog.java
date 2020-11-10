package com.cos.jwt.domain.flog;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.cos.jwt.domain.person.Member;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Flog implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int fno;
	private String flog_name;
	private String flog_motto;
	private String flog_img;
	
	@JsonIgnoreProperties("flog")
	@OneToMany(mappedBy = "flog") //foreign key 설정
	private List<Member> member;
}

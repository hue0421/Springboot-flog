package com.cos.jwt.domain.access;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.person.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data

public class Access {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ano;
	
	@JoinColumn(name="mno")
	@ManyToOne
	private Member member;
		
	@JoinColumn(name="fno")
	@ManyToOne
	private Flog flog;
}

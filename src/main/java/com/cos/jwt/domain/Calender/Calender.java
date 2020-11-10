package com.cos.jwt.domain.Calender;

import java.sql.Date;
import java.text.SimpleDateFormat;

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
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Calender {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cno;
	private String s_name;
	private Date s_date;
	
	@JoinColumn(name="mno")
	@ManyToOne
	private Member member;
	
	@JoinColumn(name="fno")
	@ManyToOne
	private Flog flog;
	
	
	
	public String  getS_date() {
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			 String dateFormated = dateFormat.format(s_date);
		     return dateFormated;
			
			}catch(Exception e){
				e.getMessage();
				return null;
			}
	}
}

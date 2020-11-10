package com.cos.jwt.domain.post;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.CreationTimestamp;

import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.image.Image;
import com.cos.jwt.domain.person.Member;
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
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int bno;
	private String title;
	@Column(length = 100000)
	private String content;
	@CreationTimestamp
	private Timestamp reg_date;
	
	

	@JoinColumn(name="mno")
	@ManyToOne //foreign key 설정
	private Member member;
	
	
	@JoinColumn(name="fno")
	@OneToOne
	private Flog flog;
	
	//@JoinColumn(name="ino")
	//@OneToMany(mappedBy = "board") //foreign key 설정
	//private List<Image> image;
	
	
	public String  getReg_date() {
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			 String dateFormated = dateFormat.format(reg_date);
		     return dateFormated;
			
			}catch(Exception e){
				e.getMessage();
				return null;
			}
	}
	
}

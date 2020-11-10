package com.cos.jwt.domain.Calender;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cos.jwt.domain.post.Board;

public interface CalenderRepository extends JpaRepository<Calender, Integer> {

	@Query(value = "SELECT * FROM calender WHERE cno = :cno",nativeQuery = true)
	Calender FindByCno(int cno);
	
	@Query(value = "SELECT * FROM calender WHERE s_date = :s_date",nativeQuery = true)
	List<Calender> FindBySDate(String s_date);
	
	@Query(value = "SELECT * FROM calender where month(s_date)= :month",nativeQuery = true)
	List<Calender> FindByMonth(String month);
	
}

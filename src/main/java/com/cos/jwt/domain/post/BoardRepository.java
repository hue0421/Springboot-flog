package com.cos.jwt.domain.post;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;



public interface BoardRepository extends JpaRepository<Board,Integer>{

	@Query(value = "SELECT * FROM board WHERE bno = :bno",nativeQuery = true)
	Board FindByBno(int bno);
	
	@Query(value = "SELECT * FROM board WHERE fno = :fno",nativeQuery = true)
	List<Board> FindAllbyFno(int fno);
	
	@Modifying
	@Query(value = "DELETE FROM board WHERE bno =:bno",nativeQuery = true)
	int DeleteByBno(int bno);

	//Page<Board> findAll(List<Board> boards, Pageable pageable);

}

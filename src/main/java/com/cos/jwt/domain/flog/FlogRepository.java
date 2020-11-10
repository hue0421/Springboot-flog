  
package com.cos.jwt.domain.flog;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.cos.jwt.domain.flog.Flog.FlogBuilder;
import com.cos.jwt.domain.post.Board;


public interface FlogRepository extends JpaRepository<Flog, Integer>{
	
	@Query(value = "SELECT * FROM flog WHERE fno = :fno",nativeQuery = true)
	Flog FindByFno(Integer fno);
	
	@Modifying
	@Query(value = "DELETE FROM flog WHERE fno =:fno",nativeQuery = true)
	void deleteByFno(int fno);

	@Query(value = "SELECT * FROM flog WHERE fno = :fno",nativeQuery = true)
	List<Flog> FindAllbyFno(int fno);
	
//	@Query(value = "SELECT fno FROM flog order by fno desc limit 1",nativeQuery = true)
//	int FindLastFno();
//	
}
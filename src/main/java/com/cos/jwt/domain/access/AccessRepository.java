package com.cos.jwt.domain.access;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AccessRepository extends JpaRepository<Access, Integer> {
   @Modifying
   @Query(value = "INSERT INTO ACCESS(FNO,MNO) VALUES(:fno,:mno)",nativeQuery = true)
   void saveAccess(int fno,int mno);
   
   @Query(value = "SELECT * FROM ACCESS WHERE fno= :fno",nativeQuery = true)
   List<Access> findByFno(int fno);
   
   @Query(value = "SELECT mno FROM ACCESS WHERE ano= :ano",nativeQuery = true)
   int findMnoByAno(int ano);
   @Query(value = "SELECT fno FROM ACCESS WHERE ano= :ano",nativeQuery = true)
   int findFnoByAno(int ano);
   
   @Modifying
   @Query(value = "DELETE FROM ACCESS WHERE ano =:ano",nativeQuery = true)
   int DeleteByAno(int ano);
   
}
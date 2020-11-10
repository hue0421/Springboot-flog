package com.cos.jwt.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cos.jwt.domain.access.Access;
import com.cos.jwt.domain.access.AccessRepository;
import com.cos.jwt.domain.person.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AccessService {

   @Autowired
   private AccessRepository accessRepository;
   @Autowired
   private MemberRepository memberRepository;
   
   
   @Transactional
   public List<Access> 요청불러오기(int fno) {
      List<Access> accesses = accessRepository.findByFno(fno);
      return accesses;
   }
   
   @Transactional
   public void 요청수락(int ano) {
      int mno = accessRepository.findMnoByAno(ano);
      int fno = accessRepository.findFnoByAno(ano);
      System.out.println("ano로 mno찾기:"+mno);
      System.out.println("ano로 fno찾기:"+fno);
      memberRepository.UpdateFnoBymno(mno, fno);
      accessRepository.DeleteByAno(ano);
      
   }
   
   @Transactional
   public void 요청거절(int ano) {
      accessRepository.DeleteByAno(ano);
      
   }
   
   
}
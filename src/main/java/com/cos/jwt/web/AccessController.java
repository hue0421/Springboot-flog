package com.cos.jwt.web;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.jwt.domain.access.Access;
import com.cos.jwt.service.AccessService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AccessController {

   private final AccessService accessService;
   
   
   @GetMapping("/access/{fno}")
   public List<Access> accessList(@PathVariable int fno){
      System.out.println("access에서 fno확인:"+fno);
      return accessService.요청불러오기(fno);
   }
   
   @PostMapping("/access/{ano}")
   public String accept(@PathVariable int ano) {
      accessService.요청수락(ano);
      return "ok";
   }
   
   @DeleteMapping("/access/{ano}")
   public String refuse(@PathVariable int ano) {
      accessService.요청거절(ano);
      return "ok";
   }
   
   
}
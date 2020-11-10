package com.cos.jwt.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cos.jwt.domain.access.Access;

import com.cos.jwt.domain.access.AccessDto;

import com.cos.jwt.domain.flog.Flog;
import com.cos.jwt.domain.flog.FlogRepository;
import com.cos.jwt.service.FlogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FlogController {

	private final FlogService flogService;
	
	@GetMapping({"","/"})
	public String index() {
		return "index";
	}
	
	
	@GetMapping("/floglist") //블로그 목록
	public Page<Flog> flogList(@PageableDefault(size = 10, sort = "fno", direction = Direction.DESC) Pageable pageable){
		Page<Flog> flogs = flogService.블로그목록(pageable);
		return flogs;
	}
	
	/*
	@GetMapping("/flog/page")
	public Page<PagingDto> pages(Pageable pageRequest) {
		Page<PagingDto> pages = flogService.paging(pageRequest);
		return pages;
	}

	@GetMapping("/flog/page/search")
	public Page<PagingDto> searchPage(@PathVariable String flog_name, Pageable pageRequest) {
		Page<PagingDto> pages = flogService.searchPaging(flog_name, pageRequest);
		return pages;
	}
	*/
	@PostMapping("/create_flog/{mno}") // 블로그 생성
	public String createFlog(HttpServletRequest request, MultipartFile  flog_img,@RequestParam("flog_name")String flog_name,
	        @RequestParam("flog_motto")String flog_motto,@PathVariable int mno) {
	     flogService.블로그생성(request, flog_img, flog_name, flog_motto);
	     System.out.println("mno:"+mno);
	     //flogService.최신블로그(mno);
	      
	     return "ok";
	 }
	   
	
	@DeleteMapping("/flog/{fno}")
	public String deleteFlog(@PathVariable int fno) {
		flogService.블로그삭제(fno);
		return "ok";
	}
	
	@PostMapping("/flog/{fno}")
	   public String 
	   updateFlog(HttpServletRequest request, MultipartFile flog_img, @RequestParam("flog_name") String flog_name,
	         @RequestParam("flog_motto") String flog_motto,@RequestParam(value="fno", defaultValue="fno") Integer fno) {
	      flogService.블로그수정(request,flog_img,flog_name,flog_motto,fno);
	      return "ok";
	}

	@GetMapping("/flog/{fno}") //글상세보기 (글수정 시 정보 들고옴)
	public Flog flogDetail(@PageableDefault(size = 5, sort = "fno", direction = Direction.DESC) Pageable pageable,@PathVariable int fno){
		Flog flog = flogService.블로그상세보기(pageable, fno);
		return flog;	
	}
	
	/*
	@GetMapping("/flogList/search")
	public String search(@RequestParam(value="keyword") String keyword, Model model) {
	    List<FlogDto> flogDtoList = flogService.searchFlog(keyword);
	    model.addAttribute("flogList", flogDtoList);
	    return "ok";
	}
	*/
	

	//블로그 신청
	
	@PostMapping("join_flog")
	public String joinApplyFlog(@RequestBody AccessDto access) {
		System.out.println("access정보:"+access);
		
		flogService.블로그신청(access);
		return "ok";
		
	}

}
package com.cos.jwt.web;


import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController{
	

	@PostMapping("/file")
	public String upload(@RequestPart MultipartFile file,
			@RequestParam("flog_name")String flog_name,
			@RequestParam("flog_motto")String flog_motto,
			@RequestParam("flog_img")String flog_img) throws Exception {
		
			 UUID uuid = UUID.randomUUID(); 
	         String flog_imgname = file.getOriginalFilename();
	         String uploadFilename = uuid.toString() + "_" + flog_imgname; 
			File dest = new File("C:\\Users\\admin\\git\\flog\\src\\main\\wepapp\\blog-app\\public\\images\\" + uploadFilename);
			file.transferTo(dest);
			// TODO	
			System.out.println(flog_name+flog_motto+flog_imgname);
		return "ok";
	}
}
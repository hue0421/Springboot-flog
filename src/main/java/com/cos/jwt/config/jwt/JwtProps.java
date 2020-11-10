package com.cos.jwt.config.jwt;

interface JwtProps {
	//public static final 이 생략되어 있음.
	String secret = "비밀키";
	String auth = "Bearer ";
	String header = "Authorization";
	Integer halfhour = 1000*60*30;
}

package com.example.demo.DTO;

public class LoginRequestTDTO {
	
	private String email;
	private String password;
	public LoginRequestTDTO(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	public LoginRequestTDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}

package com.example.demo.DTO;

import java.time.LocalDateTime;

public class UserProfileDTO {

	private String userName;
	private String userEmail;
	private LocalDateTime createdAt;
	private int quantity;
	public UserProfileDTO(String userName, String userEmail, LocalDateTime createdAt, int quantity) {
		super();
		this.userName = userName;
		this.userEmail = userEmail;
		this.createdAt = createdAt;
		this.quantity = quantity;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public UserProfileDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

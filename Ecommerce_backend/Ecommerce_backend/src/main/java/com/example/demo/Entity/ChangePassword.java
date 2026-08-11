package com.example.demo.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="changePassword")
public class ChangePassword {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="otp_id")
    private int otpid;
	@Column(nullable = false)
	private int otp;
	@Column(nullable = false)
	private LocalDateTime expiresAt;
	public LocalDateTime getExpiresAt() {
		return expiresAt;
	}
	public void setExpiresAt(LocalDateTime expiresAt) {
		this.expiresAt = expiresAt;
	}
	public ChangePassword() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public ChangePassword(int otp, LocalDateTime expiresAt, String token, User user) {
		super();
		this.otp = otp;
		this.expiresAt = expiresAt;
		this.token = token;
		this.user = user;
	}
	public ChangePassword(int otpid, int otp, LocalDateTime expiresAt, String token, User user) {
		super();
		this.otpid = otpid;
		this.otp = otp;
		this.expiresAt = expiresAt;
		this.token = token;
		this.user = user;
	}
	public int getOtpid() {
		return otpid;
	}
	public void setOtpid(int otpid) {
		this.otpid = otpid;
	}
	public int getOtp() {
		return otp;
	}
	public void setOtp(int otp) {
		this.otp = otp;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	@Column(nullable = false)
	private String token;
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
}

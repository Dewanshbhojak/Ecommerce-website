package com.example.demo.Entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.Enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class User {
	@Id()
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private int user_id;
	@Column(nullable = false , unique = true)
	private String username;
	@Column(nullable = false , unique = true)
	private String email;
	@Column(nullable = false)
	private String password;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role = Role.Customer;
	@Column(nullable = false , updatable = false)
	private LocalDateTime created_at = LocalDateTime.now();
	
	@Column(nullable = false )
	private LocalDateTime updated_at = LocalDateTime.now();

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public LocalDateTime getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}
	
	public User(int user_id, String username, String email, String password, Role role, LocalDateTime created_at,
			LocalDateTime updated_at) {
		super();
		this.user_id = user_id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}



	public User(String username, String email, String password, Role role, LocalDateTime created_at,
			LocalDateTime updated_at) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public User(String username, String email, String password, LocalDateTime created_at, LocalDateTime updated_at) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

package com.example.demo.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.LoginRequestTDTO;
import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@RestController
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")
public class UserController {

	UserService userService ;
	@Autowired
	public UserController(UserService userService) {
			super();
			this.userService = userService;
		}

	@PostMapping("/api/users/register")
	public  User registration (@RequestBody User user) {
		return userService.registerUser(user);
	}
	
	@PostMapping("/api/users/login")
	public  ResponseEntity<?> login (@RequestBody LoginRequestTDTO loginrequest, HttpServletResponse response) {
		return userService.loginuser(loginrequest,response);
	}
	
	@PostMapping("/api/users/logout")
	public  ResponseEntity<?> logOut (HttpServletRequest request , HttpServletResponse response) {
		try {
			int userId = (int) request.getAttribute("userId");
			System.out.println("controller is working");
			return userService.logout(userId, response);
			
		} catch(Exception e) {
		return ResponseEntity.badRequest().body(Map.of("Message" , "Internal issue"));
		}
	}
	@GetMapping("/api/users/myprofile")
	public ResponseEntity<?> userInformation(HttpServletRequest request) {
		try {
			Integer userId = (Integer) request.getAttribute("userId");
			 if (userId == null) {
		            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
		                    .body(Map.of(
		                            "success", false,
		                            "message", "User not authenticated"
		                    ));
		        }

			
			return ResponseEntity.ok( userService.userProfile(userId));
		}
		catch(Exception e) {

	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of(
	                        "success", false,
	                        "message", e.getMessage()
	                ));
		}
	} 
	
	@PostMapping("/api/users/changePassword")
	public ResponseEntity<?> checkEmailValidationforchangePassword(HttpServletRequest request ,@RequestParam("email") String email ) {
		try {
			
			return  userService.checkValidEmailforPassword(email);
		}
		catch(Exception e) {

	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of(
	                        "success", false,
	                        "message", e.getMessage()
	                ));
		}
	}
	
	
	@PostMapping("/api/users/newPassword")
	public ResponseEntity<?> changePassword(HttpServletRequest request ,@RequestParam("token")String token, @RequestParam("otp") int otp ,@RequestParam("password")String password ) {
		try {
			
			return  userService.changePassword(otp, password, token);
		}
		catch(Exception e) {

	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of(
	                        "success", false,
	                        "message", e.getMessage()
	                ));
		}
	}
}

package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.LoginRequestTDTO;
import com.example.demo.DTO.UserProfileDTO;
import com.example.demo.Entity.ChangePassword;
import com.example.demo.Entity.OrderItems;
import com.example.demo.Entity.Orders;
import com.example.demo.Entity.User;
import com.example.demo.Repository.ChangePasswordRepository;
import com.example.demo.Repository.JwtRepositary;
import com.example.demo.Repository.OrderitemsRepository;
import com.example.demo.Repository.OrdersRepository;
import com.example.demo.Repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
@Service
public class UserService {
		 
	private UserRepository userRepository;
	private JwtRepositary jwtRepository;
	private JwtService jwtservice;
	private OrderitemsRepository orderItemsRepository;
	private OrdersRepository ordersRepository;
	private JavaMailSender javaMailSender;
	private ChangePasswordRepository changePasswordRepository;
	public UserService(UserRepository userRepository, JwtRepositary jwtRepository, JwtService jwtservice,
			OrderitemsRepository orderItemsRepository,JavaMailSender javaMailSender, OrdersRepository ordersRepository ,ChangePasswordRepository changePasswordRepository) {
		super();
		this.userRepository = userRepository;
		this.jwtRepository = jwtRepository;
		this.jwtservice = jwtservice;
		this.orderItemsRepository = orderItemsRepository;
		this.ordersRepository = ordersRepository;
		 this.javaMailSender =javaMailSender;
		this.changePasswordRepository= changePasswordRepository;
	}
	public User registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail())!= null) {
            throw new RuntimeException("Email already exists");
            
        }

        return userRepository.save(user);
    }
	public ResponseEntity<?> loginuser(LoginRequestTDTO loginrequest,HttpServletResponse response) {
		User user = userRepository.findByEmail(loginrequest.getEmail());
		if(user==null) {
			return ResponseEntity.badRequest().body( Map.of("message","User not found"));
		}
		if(!(user.getPassword().equals(loginrequest.getPassword()))){
			return ResponseEntity.badRequest().body(Map.of("message","credential not found"));
		}
		String token = jwtservice.generateToken(user);
		Cookie cookie = new Cookie("jwt",token);
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		cookie.setDomain("localhost");
		cookie.setMaxAge(3600);
		response.addCookie(cookie);
		
		return ResponseEntity.ok(Map.of("message","Login successfull" , "Jwt", token));
	} 
	
	public ResponseEntity<?> logout(int userId,HttpServletResponse response) {
		User user = userRepository.findById(userId);
		System.out.println("services is working");
		if(user==null) {
			return ResponseEntity.badRequest().body( Map.of("message","User not found"));
		}
		
		
		Cookie cookie = new Cookie("jwt","");
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		cookie.setDomain("localhost");
		cookie.setMaxAge(0);
		response.addCookie(cookie);
		
		return ResponseEntity.ok(Map.of("message","LogOut successfull" ));
	}
	public UserProfileDTO  userProfile(int userId) {
		User user  = userRepository.findById(userId);
		if(user == null) {
			throw new RuntimeException("Invalid User");
		}
		UserProfileDTO dto = new UserProfileDTO();
		dto.setUserName(user.getUsername());
		dto.setUserEmail(user.getEmail());
		dto.setCreatedAt(user.getCreated_at());
		List<Orders> list = ordersRepository.findByUser(user);
		List<OrderItems> items = orderItemsRepository.findByOrderIn(list);
		
		int count = 0;
		for(OrderItems order : items) {
			count+= order.getQuantity();
		}
		dto.setQuantity(count);
		return dto;
	}
	
	public ResponseEntity<?> checkValidEmailforPassword(String email) {
		
		User user =  userRepository.findByEmail(email);
		
		System.out.println(user + " " + email);
		if(user == null) {
			throw new RuntimeException("Invalid Email");
		}
		
		Random random = new Random();
		
		int otp = random.nextInt(100000,999999);
		ChangePassword password = new ChangePassword();
		String token = UUID.randomUUID().toString();
		password.setOtp(otp);
		password.setUser(user);
		password.setToken(token);
		password.setExpiresAt(LocalDateTime.now().plusMinutes(5));
		changePasswordRepository.save(password);
		
		String body ="""
				Hello,

				We received a request to reset your password.

				Your One-Time Password (OTP) is:

				""" + otp + """

				This OTP is valid for 5 minutes.

				If you did not request a password reset, you can safely ignore this email.

				Thank you,

				Support Team
				""";
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		
		message.setSubject("Verify Your Email Address");
		message.setText(body);
		javaMailSender.send(message);
		
		
		
		return ResponseEntity.ok( Map.of("message ", "Otp sent to your Mail" , "token" , token));
		
		
	}
	public ResponseEntity<?> changePassword(int otp , String Password , String token) {
		
		ChangePassword cp = changePasswordRepository.findByToken(token);
		if(cp == null) {
			throw new RuntimeException("Something is wrong");
		}
		if(cp.getExpiresAt().isBefore( LocalDateTime.now())) {
			 throw new RuntimeException("OTP is expired try again ...");
		}
		if(otp != cp.getOtp()) {
			 throw new RuntimeException("Invalid OTP...");
		}
		User user = cp.getUser();
		
		if(user== null) {
			throw new RuntimeException("User is not found");
		}
		user.setPassword(Password);
		userRepository.save(user);
		changePasswordRepository.delete(cp);
	return ResponseEntity.ok("password is changed");
	
		
	}
	
	
}

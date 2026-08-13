package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.lang.Nullable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

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

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
@Service
public class UserService {
		 
	private UserRepository userRepository;
	private JwtRepositary jwtRepository;
	private JwtService jwtservice;
	private OrderitemsRepository orderItemsRepository;
	private OrdersRepository ordersRepository;
	private final RestClient restClient = RestClient.create("https://api.brevo.com");
	private ChangePasswordRepository changePasswordRepository;
	@org.springframework.beans.factory.annotation.Value("${brevo.api-key:}")
	private String brevoApiKey;
	@org.springframework.beans.factory.annotation.Value("${brevo.sender-email:}")
	private String brevoSenderEmail;
	@org.springframework.beans.factory.annotation.Value("${brevo.sender-name:Vibe Luxe Concierge Team}")
	private String brevoSenderName;
	@org.springframework.beans.factory.annotation.Value("${app.cookie.secure:false}")
	private boolean cookieSecure;
	public UserService(UserRepository userRepository, JwtRepositary jwtRepository, JwtService jwtservice,
			OrderitemsRepository orderItemsRepository, OrdersRepository ordersRepository ,ChangePasswordRepository changePasswordRepository) {
		super();
		this.userRepository = userRepository;
		this.jwtRepository = jwtRepository;
		this.jwtservice = jwtservice;
		this.orderItemsRepository = orderItemsRepository;
		this.ordersRepository = ordersRepository;
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
		response.addHeader("Set-Cookie", ResponseCookie.from("jwt", token)
				.httpOnly(true).secure(cookieSecure).sameSite(cookieSecure ? "None" : "Lax")
				.path("/").maxAge(3600).build().toString());
		
		return ResponseEntity.ok(Map.of("message","Login successfull" , "Jwt", token));
	} 
	
	public ResponseEntity<?> logout(int userId,HttpServletResponse response) {
		User user = userRepository.findById(userId);
		if(user==null) {
			return ResponseEntity.badRequest().body( Map.of("message","User not found"));
		}
		
		
		response.addHeader("Set-Cookie", ResponseCookie.from("jwt", "")
				.httpOnly(true).secure(cookieSecure).sameSite(cookieSecure ? "None" : "Lax")
				.path("/").maxAge(0).build().toString());
		
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
		
		if (brevoApiKey.isBlank() || brevoSenderEmail.isBlank()) {
			throw new RuntimeException("Email service is not configured");
		}
		restClient.post()
				.uri("/v3/smtp/email")
				.header("api-key", brevoApiKey)
				.body(Map.of(
						"sender", Map.of("email", brevoSenderEmail, "name", brevoSenderName),
						"to", List.of(Map.of("email", email)),
						"subject", "Verify Your Email Address",
						"textContent", body
				))
				.retrieve()
				.toBodilessEntity();
		
		
		
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

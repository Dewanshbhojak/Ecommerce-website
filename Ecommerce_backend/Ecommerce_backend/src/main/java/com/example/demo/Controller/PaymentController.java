package com.example.demo.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.PaymentService;
import com.razorpay.RazorpayException;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173/",allowCredentials = "true")
public class PaymentController {

	private PaymentService paymentService;
	private UserRepository userRepository;
	@Autowired
	public PaymentController(PaymentService paymentService, UserRepository userRepository) {
		super();
		this.paymentService = paymentService;
		this.userRepository = userRepository;
	}
	@PostMapping("/checkout")
	public ResponseEntity<?> createPaymentOrder(HttpServletRequest request) {
		try {
		int userId = (Integer)request.getAttribute("userId");
		User user = userRepository.findById(userId);
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
		}
		
			String razorpayid = paymentService.createOrder(user);
			return ResponseEntity.ok(Map.of(
					"Success" , true,  "orderId", razorpayid));
		} catch (RazorpayException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
					"success", false,
                    "message", e.getMessage()));
		}
		
	}
	
	@PostMapping("/verify")
	public ResponseEntity<?> verify(HttpServletRequest request, @RequestBody Map<String,String> requestbody) {
		try {
			User user  = userRepository.findById((int) request.getAttribute("userId"));
			 if (user == null) {
	                return ResponseEntity
	                        .status(HttpStatus.UNAUTHORIZED)
	                        .body("User not authenticated");
	            }
			 String razorpayId= requestbody.get("razorpayOrderId");
			 String razorpayPaymentsId= requestbody.get("razorpayPaymentId");
			 String razorpaySignature = requestbody.get("razorpaySignature");
			 boolean valid = paymentService.verifypayment(razorpayId, razorpayPaymentsId, razorpaySignature, user);
			 if (valid) {

	                return ResponseEntity.ok(
	                        Map.of(
	                                "success", true,
	                                "message",
	                                "Payment verified successfully"
	                        )
	                );
	            }

	            return ResponseEntity
	                    .status(HttpStatus.BAD_REQUEST)
	                    .body(
	                            Map.of(
	                                    "success", false,
	                                    "message",
	                                    "Payment verification failed"
	                            )
	                    );
		} catch(Exception e) {
			
			 return ResponseEntity
	                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body(Map.of( "success", false,"message", e.getMessage() ));
			
		}
		
	}
	
}

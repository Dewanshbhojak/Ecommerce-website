package com.example.demo.Controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.MyOrderService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:5173/",allowCredentials = "true")
public class MyOrderController {

	MyOrderService myOrderService ;

	public MyOrderController(MyOrderService myOrderService) {
		super();
		this.myOrderService = myOrderService;
	}
	@GetMapping("/my-order")
	public ResponseEntity<?> order(HttpServletRequest request) {
		try {
			Integer userId = (Integer)request.getAttribute("userId");
			
			if (userId == null) {
			    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
			            .body(Map.of(
			                    "success", false,
			                    "message", "User not authenticated"
			            ));
			}
			
			return ResponseEntity.ok( myOrderService.getAllMyOrder(userId));
		} catch(Exception e) {

		    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
		            .body(Map.of(
		                    "success", false,
		                    "message", e.getMessage()
		            ));
		}
	}
}

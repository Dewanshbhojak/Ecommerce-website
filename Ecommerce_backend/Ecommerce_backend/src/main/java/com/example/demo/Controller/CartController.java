package com.example.demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.CartDTO;
import com.example.demo.Service.CartService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/cart")
public class CartController {
		
	private final CartService cartService;

	@Autowired
	public CartController(CartService cartService) {
		this.cartService = cartService;
	}

	@PostMapping("/add")
	public ResponseEntity<?> addproduct(@RequestParam("productId") int productid,
										 @RequestParam(value = "quantity", defaultValue = "1") int quantity,
										 HttpServletRequest request) {
		Integer userId = (Integer) request.getAttribute("userId");
		if (userId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
		}
		return cartService.addProductInTheCart(userId, productid, quantity);
	}

	@GetMapping("/getCart")
	public ResponseEntity<?> getAllproduct(HttpServletRequest request) {
		Integer userId = (Integer) request.getAttribute("userId");
		if (userId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
		}
		List<CartDTO> list = cartService.fetchAllproduct(userId);
		return ResponseEntity.ok(list);
	}

	@DeleteMapping("/deleteCart")
	public ResponseEntity<?> deleteProduct(@RequestParam("productId") int productid, HttpServletRequest request) {
		Integer userId = (Integer) request.getAttribute("userId");
		if (userId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
		}
		return cartService.deleteProductFromTheCart(userId, productid);
	}

	@PutMapping("/updateCart")
	public ResponseEntity<?> updateProduct(@RequestParam("productId") int productid,
											@RequestParam("quantity") int quantity,
											HttpServletRequest request) {
		Integer userId = (Integer) request.getAttribute("userId");
		if (userId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
		}
		return cartService.updateProductinthecart(userId, productid, quantity);
	}
}

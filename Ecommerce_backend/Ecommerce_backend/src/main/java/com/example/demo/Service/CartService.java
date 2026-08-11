package com.example.demo.Service;

import java.math.BigDecimal;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.CartDTO;
import com.example.demo.Entity.Cart;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductImages;
import com.example.demo.Entity.User;
import com.example.demo.Repository.CartRepository;
import com.example.demo.Repository.ProductImageRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.UserRepository;

@Service
public class CartService {
	
	private final UserRepository userRepository;
	private final CartRepository cartRepository;
	private final ProductRepository productRepository;
	private final ProductImageRepository productImageRepository;

	@Autowired
	public CartService(UserRepository userRepository, CartRepository cartRepository,
			ProductRepository productRepository, ProductImageRepository productImageRepository) {
		this.userRepository = userRepository;
		this.cartRepository = cartRepository;
		this.productRepository = productRepository;
		this.productImageRepository = productImageRepository;
	}

	public ResponseEntity<?> addProductInTheCart(int userId, int productId, int quantity) {
		User user = userRepository.findById(userId);
		if (user == null) {
			return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
		}
		Product product = productRepository.findById(productId);
		if (product == null) {
			return ResponseEntity.badRequest().body(Map.of("message", "Product not found"));
		}

		Cart cart = cartRepository.findByUserAndProduct(user, product);
		if (cart == null) {
			cartRepository.save(new Cart(quantity, user, product));
		} else {
			cart.setQuantity(cart.getQuantity() + quantity);
			cartRepository.save(cart);
		}
		return ResponseEntity.ok(Map.of("message", "Product added to cart", "success", true));
	}

	public List<CartDTO> fetchAllproduct(int userId) {
		User user = userRepository.findById(userId);
		if (user == null) {
			return new ArrayList<>();
		}

		List<Cart> list = cartRepository.findByUser(user);
		List<CartDTO> res = new ArrayList<>();
		for (Cart l1 : list) {
			if (l1.getProductId() == null) continue;
			int uId = l1.getUser_id() != null ? l1.getUser_id().getUser_id() : userId;
			int pId = l1.getProductId().getProductId();
			BigDecimal price = l1.getProductId().getPrice();
			
			String image = null;
			ProductImages imgObj = productImageRepository.findTopByProduct(l1.getProductId());
			if (imgObj != null) {
				image = imgObj.getImageurl();
			}

			String name = l1.getProductId().getName();
			CartDTO cd = new CartDTO(l1.getId(), l1.getQuantity(), uId, pId, price, image, name);
			res.add(cd);
		}
		return res;
	}
	
	public ResponseEntity<?> deleteProductFromTheCart(int userId, int productId) {
		User user = userRepository.findById(userId);
		if (user == null) {
			return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
		}
		Product product = productRepository.findById(productId);
		if (product == null) {
			return ResponseEntity.badRequest().body(Map.of("message", "Product not found"));
		}
		cartRepository.deleteByUserAndProduct(user, product);
		return ResponseEntity.ok(Map.of("message", "Product deleted from cart", "success", true));
	}

	public ResponseEntity<?> updateProductinthecart(int userId, int productId, int quantity) {
		User user = userRepository.findById(userId);
		if (user == null) {
			return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
		}
		Product product = productRepository.findById(productId);
		if (product == null) {
			return ResponseEntity.badRequest().body(Map.of("message", "Product not found"));
		}

		Cart cart = cartRepository.findByUserAndProduct(user, product);
		if (cart == null) {
			return ResponseEntity.badRequest().body(Map.of("message", "Product not available in cart"));
		}
		if (quantity <= 0) {
			return deleteProductFromTheCart(userId, productId);
		}
		cart.setQuantity(quantity);
		cartRepository.save(cart);
		return ResponseEntity.ok(Map.of("message", "Cart quantity updated", "success", true));
	}
}

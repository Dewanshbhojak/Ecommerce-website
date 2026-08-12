package com.example.demo.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Service.ProductService;

@RestController
public class ProductController {

	private final ProductService productService;
	
	@Autowired
	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	// 1. Standard plural routes: /api/products
	@GetMapping("/api/products")
	public ResponseEntity<?> getAllProducts() {
		try {
			return productService.getAllProducts();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}

	@GetMapping("/api/products/new")
	public ResponseEntity<?> getNewArrivals() {
		try {
			return productService.getNewArrivals();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}

	@GetMapping("/api/products/best")
	public ResponseEntity<?> getBestSellers() {
		try {
			return productService.getBestSellers();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}

	@GetMapping("/api/products/search")
	public ResponseEntity<?> searchProducts(@RequestParam(value = "query", required = false, defaultValue = "") String query) {
		try {
			return productService.searchProducts(query);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}

	@GetMapping("/api/products/category/{categoryName}")
	public ResponseEntity<?> getByCategoryPath(@PathVariable("categoryName") String categoryName) {
		try {
			return productService.getAllbyCategory(categoryName);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}

	@GetMapping("/api/products/{id}")
	public ResponseEntity<?> getByIdPath(@PathVariable("id") int id) {
		try {
			return productService.getbyId(id);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}

	// 2. Backward compatibility endpoints for existing legacy routes: /api/product/all, /api/product/product_id
	@GetMapping("/api/product/all")
	public ResponseEntity<?> getAllProductLegacy(@RequestParam(value = "category", required = false) String name) {
		try {
			if (name != null && !name.trim().isEmpty()) {
				return productService.getAllbyCategory(name);
			}
			return productService.getAllProducts();
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
	
	@GetMapping("/api/product/product_id")
	public ResponseEntity<?> getByIdLegacy(@RequestParam("product_id") int id) {
		try {
			return productService.getbyId(id);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
}

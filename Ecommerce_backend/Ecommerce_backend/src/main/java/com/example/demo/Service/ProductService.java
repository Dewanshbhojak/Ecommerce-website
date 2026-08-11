package com.example.demo.Service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.ProductDTO;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductImages;
import com.example.demo.Repository.CategoryRepository;
import com.example.demo.Repository.ProductImageRepository;
import com.example.demo.Repository.ProductRepository;

@Service
public class ProductService {

	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	private final ProductImageRepository productImageRepository;
	
	@Autowired
	public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, ProductImageRepository productImageRepository) {
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
		this.productImageRepository = productImageRepository;
	}

	public ResponseEntity<?> getAllProducts() {
		List<Product> products = productRepository.findAll();
		return ResponseEntity.ok(convertToDtoList(products));
	}
	
	public ResponseEntity<?> getAllbyCategory(String name) {
		List<Product> products = productRepository.findByCategoryCategoryNameIgnoreCase(name);
		if (products.isEmpty()) {
			products = productRepository.findByCategoryCategoryName(name);
		}
	    return ResponseEntity.ok(convertToDtoList(products));
	}
	
	public ResponseEntity<?> getbyId(int id) {
		Product product = productRepository.findById(id); 
		if(product == null) {
			return ResponseEntity.status(404).body(Map.of("message", "Product not found"));
		}

	    List<ProductImages> images = productImageRepository.findByProductProductId(id);
	    ProductDTO dto = new ProductDTO(product, images);
	    return ResponseEntity.ok(dto);
	}

	public ResponseEntity<?> getNewArrivals() {
		List<Product> products = productRepository.findTop8ByOrderByCreatedAtDesc();
		if (products.isEmpty()) {
			products = productRepository.findAll();
		}
		return ResponseEntity.ok(convertToDtoList(products));
	}

	public ResponseEntity<?> getBestSellers() {
		List<Product> products = productRepository.findTop8ByOrderByProductIdDesc();
		if (products.isEmpty()) {
			products = productRepository.findAll();
		}
		return ResponseEntity.ok(convertToDtoList(products));
	}

	public ResponseEntity<?> searchProducts(String query) {
		if (query == null || query.trim().isEmpty()) {
			return getAllProducts();
		}
		String cleanQuery = query.trim();
		List<Product> products = productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(cleanQuery, cleanQuery);
		return ResponseEntity.ok(convertToDtoList(products));
	}

	private List<ProductDTO> convertToDtoList(List<Product> products) {
		List<ProductDTO> response = new ArrayList<>();
		for (Product p : products) {
			List<ProductImages> images = productImageRepository.findByProductProductId(p.getProductId());
			response.add(new ProductDTO(p, images));
		}
		return response;
	}
}

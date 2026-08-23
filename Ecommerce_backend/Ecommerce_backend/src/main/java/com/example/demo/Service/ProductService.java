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

import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ProductService {

	private static final Logger log = LoggerFactory.getLogger(ProductService.class);

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
		if (products == null || products.isEmpty()) {
			return Collections.emptyList();
		}
		long startTime = System.currentTimeMillis();

		List<Integer> productIds = products.stream()
				.map(Product::getProductId)
				.filter(Objects::nonNull)
				.distinct()
				.toList();

		List<ProductImages> allImages = productImageRepository.findByProductProductIdIn(productIds);

		Map<Integer, List<ProductImages>> imagesByProductId = allImages.stream()
				.filter(img -> img.getProduct() != null && img.getProduct().getProductId() != null)
				.collect(Collectors.groupingBy(img -> img.getProduct().getProductId()));

		List<ProductDTO> response = new ArrayList<>(products.size());
		for (Product p : products) {
			List<ProductImages> images = imagesByProductId.getOrDefault(p.getProductId(), Collections.emptyList());
			response.add(new ProductDTO(p, images));
		}

		long duration = System.currentTimeMillis() - startTime;
		log.info("Converted {} products to DTOs using 1 batch image query in {}ms", products.size(), duration);

		return response;
	}
}

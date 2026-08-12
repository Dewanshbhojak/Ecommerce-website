package com.example.demo.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	List<Product> findByCategoryCategoryName(String categoryName);
	List<Product> findByCategoryCategoryNameIgnoreCase(String categoryName);
	boolean existsByNameIgnoreCase(String name);
	List<Product> findByProductId(int productId);
	Product findById(int productId);
	List<Product> findTop8ByOrderByCreatedAtDesc();
	List<Product> findTop8ByOrderByProductIdDesc();
	List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String nameQuery, String descQuery);
}


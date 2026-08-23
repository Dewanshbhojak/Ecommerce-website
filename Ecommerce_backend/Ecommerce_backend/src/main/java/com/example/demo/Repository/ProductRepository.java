package com.example.demo.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	@EntityGraph(attributePaths = {"category"})
	List<Product> findAll();

	@EntityGraph(attributePaths = {"category"})
	List<Product> findByCategoryCategoryName(String categoryName);

	@EntityGraph(attributePaths = {"category"})
	List<Product> findByCategoryCategoryNameIgnoreCase(String categoryName);

	boolean existsByNameIgnoreCase(String name);
	List<Product> findByProductId(int productId);
	Product findById(int productId);

	@EntityGraph(attributePaths = {"category"})
	List<Product> findTop8ByOrderByCreatedAtDesc();

	@EntityGraph(attributePaths = {"category"})
	List<Product> findTop8ByOrderByProductIdDesc();

	@EntityGraph(attributePaths = {"category"})
	List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String nameQuery, String descQuery);
}

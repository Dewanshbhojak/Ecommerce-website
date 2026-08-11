package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Cart;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.User;

import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer>{

//	@Query("select c from Cart c where c.user_id = :userId AND c.productId = :productId")
	Cart findByUserAndProduct( User user, Product product);
	List<Cart> findByUser(User user);
	@Modifying
	@Transactional
	void deleteByUserAndProduct(User user, Product product);
	void deleteAllCartItemsByUser(User user);
}

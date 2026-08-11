package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Orders;
import com.example.demo.Entity.User;

import java.util.List;


@Repository
public interface OrdersRepository extends JpaRepository<Orders, String>{
		List<Orders> findByUser(User user);
}

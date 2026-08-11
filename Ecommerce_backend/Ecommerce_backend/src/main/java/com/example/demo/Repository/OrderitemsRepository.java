package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.OrderItems;
import com.example.demo.Entity.Orders;

import java.util.List;


@Repository
public interface OrderitemsRepository extends JpaRepository<OrderItems, Integer>{
		List<OrderItems> findByOrder(Orders order);
		
		List<OrderItems> findByOrderIn(List<Orders> orders);
}

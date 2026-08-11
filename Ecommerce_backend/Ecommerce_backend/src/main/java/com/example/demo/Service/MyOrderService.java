package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.OrderItems;
import com.example.demo.Entity.Orders;
import com.example.demo.Entity.ProductImages;
import com.example.demo.Entity.User;
import com.example.demo.Repository.OrderitemsRepository;
import com.example.demo.Repository.OrdersRepository;
import com.example.demo.Repository.ProductImageRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

import com.example.demo.DTO.OrderDTO;
import com.example.demo.DTO.OrderItemDTO;

@Service
public class MyOrderService {

	OrderitemsRepository orderitemsRepository;
	OrdersRepository orderRepository;
	ProductRepository  productRepository;
	UserRepository userRepository;
	ProductImageRepository productImageRepository;
	
	
	
	public MyOrderService(OrderitemsRepository orderitemsRepository, OrdersRepository orderRepository,
			ProductRepository productRepository, UserRepository userRepository,
			ProductImageRepository productImageRepository) {
		super();
		this.orderitemsRepository = orderitemsRepository;
		this.orderRepository = orderRepository;
		this.productRepository = productRepository;
		this.userRepository = userRepository;
		this.productImageRepository = productImageRepository;
	}



	public List<OrderDTO> getAllMyOrder(int userId) {;
	
		User user = userRepository.findById(userId);
		
		if(user == null) {
			   throw new RuntimeException("Invalid User");
		}
		
		List<OrderDTO> orderDTOList = new ArrayList<>();
		
		List<Orders> orderlist = orderRepository.findByUser(user);
		for (Orders order: orderlist) {
			OrderDTO dto = new OrderDTO();
			 
			dto.setOrderId(order.getOrderId());
			dto.setCreatedAt(order.getCreatedAt());
			dto.setStatus(order.getStatus());
			dto.setTotalAmount(order.getTotalAmount());
			List<OrderItems> orderItemsList = orderitemsRepository.findByOrder(order);
			 List<OrderItemDTO> itemDTOList = new ArrayList();
			for(OrderItems orderItems : orderItemsList) {
				OrderItemDTO itemdto = new OrderItemDTO();
				itemdto.setProductName( orderItems.getProduct().getName());
				itemdto.setProductId(orderItems.getProduct().getProductId());
				itemdto.setQuantity(orderItems.getQuantity());
				itemdto.setPricePerUnit(orderItems.getPricePerUnit());
				itemdto.setTotalPrice(orderItems.getTotalPrice());
				 List<ProductImages> images =
	                        productImageRepository.findByProductProductId(
	                                orderItems.getProduct().getProductId());

	                if (!images.isEmpty()) {

	                    itemdto.setImage(
	                            images.get(0).getImageurl());

	                }

	                itemDTOList.add(itemdto);
	                
			}
			dto.setItems(itemDTOList);
	        orderDTOList.add(dto);

		}
		
		
		return orderDTOList;
		
	}
}

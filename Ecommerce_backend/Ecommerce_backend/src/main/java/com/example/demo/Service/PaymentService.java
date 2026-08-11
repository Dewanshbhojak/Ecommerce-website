package com.example.demo.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Cart;
import com.example.demo.Entity.OrderItems;
import com.example.demo.Entity.Orders;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.User;
import com.example.demo.Enums.Status;
import com.example.demo.Repository.CartRepository;
import com.example.demo.Repository.OrderitemsRepository;
import com.example.demo.Repository.OrdersRepository;
import com.example.demo.Repository.UserRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.transaction.Transactional;

@Service
public class PaymentService {
	@Value("${razorpay.key_id}")
	String razorpayKeyId;
	@Value("${razorpay.key_secret}")
	String razorpayKeySecret;
	
	private OrderitemsRepository orderitemsRepository;
	private OrdersRepository ordersRepository;
	private CartRepository cartRepository;
	
	public PaymentService(OrderitemsRepository orderRepository, OrdersRepository ordersRepository,
			CartRepository cartRepository) {
		super();
		this.orderitemsRepository = orderRepository;
		this.ordersRepository = ordersRepository;
		this.cartRepository = cartRepository;
	}
	@Transactional
	public String createOrder(User user) throws RazorpayException {
		List<Cart> listCart = cartRepository.findByUser(user);
		
		if(listCart.isEmpty()) {
			throw new RuntimeException("Cart is Empty");
		}
		BigDecimal total_amount = BigDecimal.ZERO;
		for(Cart cart : listCart ) {
			Product product = cart.getProductId();
			BigDecimal item_amount = product.getPrice().multiply(BigDecimal.valueOf(cart.getQuantity()));
			total_amount=total_amount.add(item_amount);
		}
		System.out.println("User = " + user);
		System.out.println("Cart Size = " + listCart.size());
		System.out.println("Total Amount = " + total_amount);
		System.out.println("Key Id = " + razorpayKeyId);
		RazorpayClient razorPayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
		JSONObject orderRequest  = new JSONObject();
		orderRequest.put("amount",total_amount.multiply(BigDecimal.valueOf(100)).intValue());
		orderRequest.put("currency","INR");
		orderRequest.put("receipt","txn_" + System.currentTimeMillis());
		
		 com.razorpay.Order razorpayOrder =
	                razorPayClient.orders.create(orderRequest);
		Orders order = new Orders();
		order.setOrderId(razorpayOrder.get("id"));
		order.setUser(user);
		order.setTotalAmount(total_amount);
		order.setStatus(Status.PENDING);
		order.setCreatedAt(LocalDateTime.now());
		order.setUpdatedAt(LocalDateTime.now());
		ordersRepository.save(order);
		return razorpayOrder.get("id");
	}
	@Transactional
	public boolean verifypayment(
	        String razorpayOrderId,
	        String razorpayPaymentId,
	        String razorpaySignature,
	        User user) {

	    try {

	        JSONObject attributes = new JSONObject();

	        attributes.put("razorpay_order_id", razorpayOrderId);
	        attributes.put("razorpay_payment_id", razorpayPaymentId);
	        attributes.put("razorpay_signature", razorpaySignature);

	        boolean isValid =
	                com.razorpay.Utils.verifyPaymentSignature(
	                        attributes,
	                        razorpayKeySecret);
	        System.out.println(isValid);

	        if (!isValid) {
	            return false;
	        }

	        Orders order =
	                ordersRepository.findById(razorpayOrderId)
	                        .orElseThrow(() ->
	                                new RuntimeException("Order not found"));

	        order.setStatus(Status.SUCCESS);
	        order.setUpdatedAt(LocalDateTime.now());

	        ordersRepository.save(order);

	        List<Cart> cart = cartRepository.findByUser(user);

	        for (Cart c : cart) {

	            OrderItems orderItem = new OrderItems();

	            orderItem.setOrder(order);
	            orderItem.setProduct(c.getProductId());
	            orderItem.setQuantity(c.getQuantity());

	            orderItem.setPricePerUnit(
	                    c.getProductId().getPrice());

	            orderItem.setTotalPrice(
	                    c.getProductId()
	                     .getPrice()
	                     .multiply(
	                         BigDecimal.valueOf(
	                             c.getQuantity()
	                         )
	                     )
	            );

	            orderitemsRepository.save(orderItem);
	        }

	        cartRepository.deleteAllCartItemsByUser(user);

	        return true;

	    } catch (Exception e) {

	        e.printStackTrace();
	        return false;
	    }
	}
	  
  }




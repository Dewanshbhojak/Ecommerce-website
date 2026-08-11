package com.example.demo.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.example.demo.Enums.Status;

public class OrderDTO {

    private String orderId;

    private LocalDateTime createdAt;

    private BigDecimal totalAmount;

    private Status status;
    
    private List<OrderItemDTO> items;

    public OrderDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public List<OrderItemDTO> getItems() {
		return items;
	}

	public void setItems(List<OrderItemDTO> items) {
		this.items = items;
	}

	public OrderDTO(String orderId, LocalDateTime createdAt, BigDecimal totalAmount, Status status,
			List<OrderItemDTO> items) {
		super();
		this.orderId = orderId;
		this.createdAt = createdAt;
		this.totalAmount = totalAmount;
		this.status = status;
		this.items = items;
	}

	
}

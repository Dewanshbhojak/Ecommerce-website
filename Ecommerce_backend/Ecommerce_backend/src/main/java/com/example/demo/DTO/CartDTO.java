package com.example.demo.DTO;

import java.math.BigDecimal;

public class CartDTO {

	private int id;

	private int quantity;

	private int userId;
	
	private int productId;
	
	private BigDecimal price;
	
	private String imageUrl;
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public CartDTO(int id, int quantity, int userId, int productId, BigDecimal price, String imageUrl,String name) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.userId = userId;
		this.productId = productId;
		this.price = price;
		this.imageUrl = imageUrl;
		this.name = name;
	}

	public CartDTO() {
		super();
		// TODO Auto-generated constructor stub
	}


	
}

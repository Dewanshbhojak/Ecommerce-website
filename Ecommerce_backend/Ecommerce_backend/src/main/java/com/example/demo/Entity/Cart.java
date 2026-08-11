package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart_items")
public class Cart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name= "id", nullable = false)
	private int id;
	@Column(name= "quantity", nullable = false)
	private int quantity;
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	@ManyToOne
	@JoinColumn(name="productId")
	private Product product;
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Cart(int id, int quantity, User user_id, Product productId) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.user = user_id;
		this.product= productId;
	}
	public Cart(int quantity, User user_id, Product productId) {
		super();
		this.quantity = quantity;
		this.user = user_id;
		this.product = productId;
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
	public User getUser_id() {
		return user;
	}
	public void setUser_id(User user_id) {
		this.user = user_id;
	}
	public Product getProductId() {
		return product;
	}
	public void setProductId(Product productId) {
		this.product = productId;
	}
}

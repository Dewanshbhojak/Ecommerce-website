package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int category_id;
	@Column(nullable = false, unique = true , name = "category_name")
	private String categoryName;
	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(columnDefinition = "TEXT", name = "image_url")
	private String imageUrl;

	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Category() {
		super();
	}

	public Category(int category_id, String categoryName, String description, String imageUrl) {
		super();
		this.category_id = category_id;
		this.categoryName = categoryName;
		this.description = description;
		this.imageUrl = imageUrl;
	}

	public Category(String categoryName, String description, String imageUrl) {
		super();
		this.categoryName = categoryName;
		this.description = description;
		this.imageUrl = imageUrl;
	}

	public Category(String category_name) {
		super();
		this.categoryName = category_name;
	}
}


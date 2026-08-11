package com.example.demo.DTO;

import com.example.demo.Entity.Wishlist;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class WishlistDTO {
    private Integer id;
    private Integer productId;
    private String name;
    private String category;
    private BigDecimal price;
    private String imageUrl;
    private Integer stock;
    private LocalDateTime createdAt;

    public WishlistDTO() {
    }

    public WishlistDTO(Wishlist wishlist, String imageUrl) {
        this.id = wishlist.getId();
        if (wishlist.getProduct() != null) {
            this.productId = wishlist.getProduct().getProductId();
            this.name = wishlist.getProduct().getName();
            if (wishlist.getProduct().getCategory() != null) {
                this.category = wishlist.getProduct().getCategory().getCategoryName();
            }
            this.price = wishlist.getProduct().getPrice();
            this.stock = wishlist.getProduct().getStock();
        }
        this.imageUrl = imageUrl;
        this.createdAt = wishlist.getCreatedAt();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

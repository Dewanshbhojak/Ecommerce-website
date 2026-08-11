package com.example.demo.DTO;

import java.math.BigDecimal;

public class OrderItemDTO {

	 private Integer productId;

	    private String productName;

	    private String image;

	    private Integer quantity;

	    private BigDecimal pricePerUnit;

	    private BigDecimal totalPrice;

		public Integer getProductId() {
			return productId;
		}

		public void setProductId(Integer productId) {
			this.productId = productId;
		}

		public String getProductName() {
			return productName;
		}

		public void setProductName(String productName) {
			this.productName = productName;
		}

		public String getImage() {
			return image;
		}

		public void setImage(String image) {
			this.image = image;
		}

		public Integer getQuantity() {
			return quantity;
		}

		public void setQuantity(Integer quantity) {
			this.quantity = quantity;
		}

		public BigDecimal getPricePerUnit() {
			return pricePerUnit;
		}

		public void setPricePerUnit(BigDecimal pricePerUnit) {
			this.pricePerUnit = pricePerUnit;
		}

		public BigDecimal getTotalPrice() {
			return totalPrice;
		}

		public void setTotalPrice(BigDecimal totalPrice) {
			this.totalPrice = totalPrice;
		}

		public OrderItemDTO(Integer productId, String productName, String image, Integer quantity,
				BigDecimal pricePerUnit, BigDecimal totalPrice) {
			super();
			this.productId = productId;
			this.productName = productName;
			this.image = image;
			this.quantity = quantity;
			this.pricePerUnit = pricePerUnit;
			this.totalPrice = totalPrice;
		}

		public OrderItemDTO() {
			super();
			// TODO Auto-generated constructor stub
		}
	    
	    
}

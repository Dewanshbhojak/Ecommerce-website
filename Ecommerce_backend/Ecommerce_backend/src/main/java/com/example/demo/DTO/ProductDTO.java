package com.example.demo.DTO;

import java.util.List;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductImages;

public class ProductDTO {
		
		private Product product;
		private List<ProductImages> list;
		public Product getProduct() {
			return product;
		}
		public void setProduct(Product product) {
			this.product = product;
		}
		public List<ProductImages> getList() {
			return list;
		}
		public void setList(List<ProductImages> list) {
			this.list = list;
		}
		public ProductDTO(Product product, List<ProductImages> list) {
			super();
			this.product = product;
			this.list = list;
		}
		
		
	
}

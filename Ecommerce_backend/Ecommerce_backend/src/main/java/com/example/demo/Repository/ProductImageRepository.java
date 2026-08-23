package com.example.demo.Repository;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductImages;


@Repository
public interface ProductImageRepository extends JpaRepository<ProductImages, Integer> {
		List<ProductImages> findByImageid(int imageid);
		List<ProductImages> findByProductProductId(int productId);
		ProductImages findTopByProduct(Product product);

		@Query("SELECT pi FROM ProductImages pi JOIN FETCH pi.product WHERE pi.product.productId IN :productIds")
		List<ProductImages> findByProductProductIdIn(@Param("productIds") Collection<Integer> productIds);
}


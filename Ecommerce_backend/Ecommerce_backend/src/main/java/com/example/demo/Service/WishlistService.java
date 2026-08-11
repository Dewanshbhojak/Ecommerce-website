package com.example.demo.Service;

import com.example.demo.DTO.WishlistDTO;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductImages;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Wishlist;
import com.example.demo.Repository.ProductImageRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    @Autowired
    public WishlistService(WishlistRepository wishlistRepository, UserRepository userRepository,
                           ProductRepository productRepository, ProductImageRepository productImageRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
    }

    public ResponseEntity<?> getWishlist(int userId) {
        User user = userRepository.findById(userId);
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
        }
        List<Wishlist> wishlistItems = wishlistRepository.findByUser(user);
        List<WishlistDTO> response = new ArrayList<>();
        for (Wishlist item : wishlistItems) {
            String imageUrl = null;
            if (item.getProduct() != null) {
                ProductImages img = productImageRepository.findTopByProduct(item.getProduct());
                if (img != null) {
                    imageUrl = img.getImageurl();
                }
            }
            response.add(new WishlistDTO(item, imageUrl));
        }
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> addToWishlist(int userId, int productId) {
        User user = userRepository.findById(userId);
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
        }
        Product product = productRepository.findById(productId);
        if (product == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Product not found"));
        }

        if (wishlistRepository.existsByUserAndProduct(user, product)) {
            return ResponseEntity.ok(Map.of("message", "Product already in wishlist", "success", true));
        }

        Wishlist wishlist = new Wishlist(user, product);
        wishlistRepository.save(wishlist);
        return ResponseEntity.ok(Map.of("message", "Added to wishlist", "success", true));
    }

    public ResponseEntity<?> removeFromWishlist(int userId, int productId) {
        User user = userRepository.findById(userId);
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("message", "User not authenticated"));
        }
        Product product = productRepository.findById(productId);
        if (product == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Product not found"));
        }

        wishlistRepository.deleteByUserAndProduct(user, product);
        return ResponseEntity.ok(Map.of("message", "Removed from wishlist", "success", true));
    }
}

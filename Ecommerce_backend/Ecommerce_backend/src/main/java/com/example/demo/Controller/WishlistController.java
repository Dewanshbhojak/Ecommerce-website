package com.example.demo.Controller;

import com.example.demo.Service.WishlistService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public ResponseEntity<?> getWishlist(HttpServletRequest request) {
        try {
            Integer userId = (Integer) request.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
            }
            return wishlistService.getWishlist(userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> addToWishlist(HttpServletRequest request,
                                            @RequestParam(value = "productId", required = false) Integer queryProductId,
                                            @RequestBody(required = false) Map<String, Object> body) {
        try {
            Integer userId = (Integer) request.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
            }

            Integer productId = queryProductId;
            if (productId == null && body != null) {
                Object pObj = body.get("productId");
                if (pObj != null) {
                    productId = Integer.parseInt(pObj.toString());
                }
            }

            if (productId == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "ProductId is required"));
            }

            return wishlistService.addToWishlist(userId, productId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromWishlist(HttpServletRequest request, @PathVariable("productId") int productId) {
        try {
            Integer userId = (Integer) request.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
            }
            return wishlistService.removeFromWishlist(userId, productId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

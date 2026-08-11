package com.example.demo.Config;

import com.example.demo.Entity.Category;
import com.example.demo.Entity.Product;
import com.example.demo.Entity.ProductImages;
import com.example.demo.Repository.CategoryRepository;
import com.example.demo.Repository.ProductImageRepository;
import com.example.demo.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    @Autowired
    public DataInitializer(CategoryRepository categoryRepository, ProductRepository productRepository, ProductImageRepository productImageRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedCategoriesAndProducts();
    }

    private void seedCategoriesAndProducts() {
        Map<String, Category> categoryMap = new HashMap<>();

        String[][] categoriesInfo = {
            {"Men", "Refined essentials & tailored outerwear crafted for everyday distinction", "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800"},
            {"Women", "Elegance defined by contemporary cuts & luxury sustainable fabrics", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"},
            {"Kids", "Vibrant, durable junior styles built for comfortable everyday play", "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800"},
            {"Shoes", "Iconic luxury footwear engineered for unparalleled comfort & durability", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"},
            {"Watches", "Precision timepieces & luxury chronographs designed to make a statement", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"},
            {"Perfumes", "Signature scents & artisanal fragrance blends crafted from rare botanicals", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"},
            {"Glasses", "Designer eyewear & timeless hand-finished frame silhouettes", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"},
            {"Accessories", "Bespoke leather goods, structured bags & essential lifestyle details", "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800"}
        };

        for (String[] info : categoriesInfo) {
            String name = info[0];
            String desc = info[1];
            String imgUrl = info[2];

            Category category = categoryRepository.findByCategoryNameIgnoreCase(name)
                .orElseGet(() -> {
                    Category c = new Category(name, desc, imgUrl);
                    return categoryRepository.save(c);
                });

            // Ensure description and imageUrl are updated
            if (category.getDescription() == null || category.getImageUrl() == null) {
                category.setDescription(desc);
                category.setImageUrl(imgUrl);
                category = categoryRepository.save(category);
            }

            categoryMap.put(name, category);
        }

        if (productRepository.count() == 0) {
            Object[][] seedProducts = {
                // Name, Description, Price, Stock, CategoryName, MainImageUrl
                {"Classic Italian Leather Sneakers", "Handcrafted in Florence using full-grain calfskin leather with lightweight rubber cupsole.", 185.00, 25, "Shoes", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"},
                {"Suede Chelsea Boots", "Classic ankle silhouette with stretch side goring and stacked leather heel.", 260.00, 18, "Shoes", "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800"},
                {"Oversized Cashmere Crewneck", "Ultra-soft 100% Mongolian cashmere knit sweater in a relaxed modern silhouette.", 240.00, 15, "Women", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"},
                {"Silk Wrap Trench Dress", "Fluid midi dress woven from pure mulberry silk with waist tie belt detail.", 280.00, 12, "Women", "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800"},
                {"Tailored Linen Blazer", "Unstructured lightweight Italian linen jacket tailored for breathable warm-weather elegance.", 290.00, 20, "Men", "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800"},
                {"Minimalist Oxford Cotton Shirt", "Essential button-down woven from long-staple organic Egyptian cotton.", 130.00, 30, "Men", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800"},
                {"Minimalist Chronograph Gold Watch", "Swiss movement chronograph watch featuring 18k gold-plated case and sapphire crystal.", 320.00, 10, "Watches", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"},
                {"Matte Black Automatic Diver Watch", "300m water-resistant diving timepiece with stainless steel mesh bracelet.", 390.00, 8, "Watches", "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800"},
                {"Artisanal Eau De Parfum (50ml)", "Intense botanical blend featuring notes of bergamot, smoked cedar, and white amber.", 145.00, 40, "Perfumes", "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"},
                {"Polarized Acetate Sunglasses", "Hand-cut Japanese acetate frame with anti-reflective polarized UV400 lenses.", 165.00, 22, "Glasses", "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"},
                {"Structured Calfskin Tote Bag", "Spacious luxury carryall with double top handles and removable shoulder strap.", 380.00, 14, "Accessories", "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800"},
                {"Organic Cotton Junior Denim Jacket", "Classic trucker jacket built with soft organic cotton denim for kids.", 95.00, 25, "Kids", "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800"}
            };

            for (Object[] pData : seedProducts) {
                String pName = (String) pData[0];
                String pDesc = (String) pData[1];
                BigDecimal pPrice = BigDecimal.valueOf((Double) pData[2]);
                Integer pStock = (Integer) pData[3];
                String catName = (String) pData[4];
                String imgUrl = (String) pData[5];

                Category cat = categoryMap.get(catName);
                if (cat != null) {
                    Product p = new Product(pName, pDesc, pPrice, pStock, cat, LocalDateTime.now(), LocalDateTime.now());
                    Product savedProduct = productRepository.save(p);

                    ProductImages pImg = new ProductImages();
                    pImg.setProduct(savedProduct);
                    pImg.setImageurl(imgUrl);
                    productImageRepository.save(pImg);
                }
            }
            System.out.println("=================================================");
            System.out.println("SUCCESSFULLY SEEDED 8 CATEGORIES & SAMPLE PRODUCTS");
            System.out.println("=================================================");
        }
    }
}

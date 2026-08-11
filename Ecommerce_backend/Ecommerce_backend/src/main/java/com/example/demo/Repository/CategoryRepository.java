package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Entity.Category;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{

Optional<Category> findByCategoryName(String categoryName);
Optional<Category> findByCategoryNameIgnoreCase(String categoryName);
}


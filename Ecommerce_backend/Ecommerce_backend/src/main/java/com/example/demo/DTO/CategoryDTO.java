package com.example.demo.DTO;

import com.example.demo.Entity.Category;

public class CategoryDTO {
    private int id;
    private String name;
    private String description;
    private String imageUrl;

    public CategoryDTO() {
    }

    public CategoryDTO(Category category) {
        this.id = category.getCategory_id();
        this.name = category.getCategoryName();
        this.description = category.getDescription();
        this.imageUrl = category.getImageUrl();
    }

    public CategoryDTO(int id, String name, String description, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}

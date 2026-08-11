package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.JwtToken;

public interface JwtRepositary extends JpaRepository<JwtToken, Integer> {

}

package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.ChangePassword;

@Repository
public interface ChangePasswordRepository extends JpaRepository<ChangePassword, Integer> {
     ChangePassword findByToken(String token);
}

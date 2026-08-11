package com.example.demo.Repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.User;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer> {
		User findByEmail(String email);
		User findByPassword(String password);
		User findById(int user_id);
}

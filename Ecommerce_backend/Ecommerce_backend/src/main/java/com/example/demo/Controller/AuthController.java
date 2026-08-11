package com.example.demo.Controller;

import com.example.demo.Service.OtpAuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final OtpAuthService otpAuthService;

    @Autowired
    public AuthController(OtpAuthService otpAuthService) {
        this.otpAuthService = otpAuthService;
    }

    @PostMapping({"/api/auth/send-otp", "/api/users/send-otp"})
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            return otpAuthService.sendOtp(email);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage(), "success", false));
        }
    }

    @PostMapping({"/api/auth/verify-otp", "/api/users/verify-otp"})
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request, HttpServletResponse response) {
        try {
            String email = request.get("email");
            String otp = request.get("otp");
            return otpAuthService.verifyOtp(email, otp, response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage(), "success", false));
        }
    }
}

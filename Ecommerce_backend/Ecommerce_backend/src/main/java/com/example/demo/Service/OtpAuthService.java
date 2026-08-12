package com.example.demo.Service;

import com.example.demo.Entity.OtpToken;
import com.example.demo.Entity.User;
import com.example.demo.Enums.Role;
import com.example.demo.Repository.OtpTokenRepository;
import com.example.demo.Repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpAuthService {

    private final OtpTokenRepository otpTokenRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final JavaMailSender javaMailSender;

    @Autowired
    public OtpAuthService(OtpTokenRepository otpTokenRepository, UserRepository userRepository,
                          JwtService jwtService, @Autowired(required = false) JavaMailSender javaMailSender) {
        this.otpTokenRepository = otpTokenRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.javaMailSender = javaMailSender;
    }

    public ResponseEntity<?> sendOtp(String email) {
        if (email == null || !email.contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid email address"));
        }

        String cleanEmail = email.trim().toLowerCase();

        // Rate limiting check: check if OTP was sent in the last 15 seconds
        Optional<OtpToken> lastTokenOpt = otpTokenRepository.findTopByEmailAndUsedFalseOrderByCreatedAtDesc(cleanEmail);
        if (lastTokenOpt.isPresent()) {
            OtpToken lastToken = lastTokenOpt.get();
            if (lastToken.getCreatedAt().plusSeconds(15).isAfter(LocalDateTime.now())) {
                return ResponseEntity.badRequest().body(Map.of("message", "Please wait a few seconds before requesting a new OTP"));
            }
        }

        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        String otpCode = String.valueOf(code);

        OtpToken otpToken = new OtpToken(cleanEmail, otpCode, LocalDateTime.now().plusMinutes(5));
        otpTokenRepository.save(otpToken);

        System.out.println("=================================================");
        System.out.println("DISPATCHED OTP FOR " + cleanEmail + ": " + otpCode);
        System.out.println("=================================================");

        if (javaMailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(cleanEmail);
                message.setSubject("Vibe Luxe - Your Security Verification Passcode");
                message.setText("Hello,\n\nYour One-Time Passcode (OTP) for Vibe Luxe login is: " + otpCode + "\n\nThis code expires in 5 minutes.\n\nThank you,\nVibe Luxe Concierge Team");
                javaMailSender.send(message);
            } catch (Exception e) {
                System.err.println("Mail send exception: " + e.getMessage());
            }
        }

        return ResponseEntity.ok(Map.of(
            "message", "OTP sent successfully to " + cleanEmail,
            "email", cleanEmail,
            "success", true
        ));
    }

    public ResponseEntity<?> verifyOtp(String email, String otpCode, HttpServletResponse response) {
        if (email == null || otpCode == null || otpCode.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and OTP code are required"));
        }

        String cleanEmail = email.trim().toLowerCase();
        String cleanOtp = otpCode.trim();

        Optional<OtpToken> tokenOpt = otpTokenRepository.findTopByEmailAndUsedFalseOrderByCreatedAtDesc(cleanEmail);

        if (tokenOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP. Please request a new code."));
        }

        OtpToken token = tokenOpt.get();

        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(Map.of("message", "OTP code has expired. Please request a new code."));
        }

        if (!token.getOtpCode().equals(cleanOtp)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid OTP code. Please check and try again."));
        }

        // Mark OTP as used
        token.setUsed(true);
        otpTokenRepository.save(token);

        // Find or create user
        User user = userRepository.findByEmail(cleanEmail);
        if (user == null) {
            String username = cleanEmail.split("@")[0];
            user = new User();
            user.setUsername(username);
            user.setEmail(cleanEmail);
            user.setPassword("OTP_AUTH_USER");
            user.setRole(Role.Customer);
            user = userRepository.save(user);
        }

        String jwtToken = jwtService.generateToken(user);
        Cookie cookie = new Cookie("jwt", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(86400); // 24 hours
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of(
            "message", "Login successfull",
            "Jwt", jwtToken,
            "body", Map.of(
                "userId", user.getUser_id(),
                "name", user.getUsername(),
                "email", user.getEmail()
            )
        ));
    }
}

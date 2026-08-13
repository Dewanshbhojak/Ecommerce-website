package com.example.demo.Service;

import com.example.demo.Entity.OtpToken;
import com.example.demo.Entity.User;
import com.example.demo.Enums.Role;
import com.example.demo.Repository.OtpTokenRepository;
import com.example.demo.Repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseCookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.security.SecureRandom;

@Service
public class OtpAuthService {

    private final OtpTokenRepository otpTokenRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RestClient restClient;

    @Value("${brevo.api-key:}")
    private String brevoApiKey;

    @Value("${brevo.sender-email:}")
    private String brevoSenderEmail;

    @Value("${brevo.sender-name:Vibe Luxe Concierge Team}")
    private String brevoSenderName;

    @org.springframework.beans.factory.annotation.Value("${app.cookie.secure:false}")
    private boolean cookieSecure;

    @Autowired
    public OtpAuthService(OtpTokenRepository otpTokenRepository, UserRepository userRepository,
                          JwtService jwtService) {
        this.otpTokenRepository = otpTokenRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.restClient = RestClient.create("https://api.brevo.com");
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

        SecureRandom random = new SecureRandom();
        int code = 100000 + random.nextInt(900000);
        String otpCode = String.valueOf(code);

        if (brevoApiKey.isBlank() || brevoSenderEmail.isBlank()) {
            return ResponseEntity.status(503).body(Map.of("message", "Email service is not configured"));
        }
        try {
            restClient.post()
                    .uri("/v3/smtp/email")
                    .header("api-key", brevoApiKey)
                    .body(Map.of(
                            "sender", Map.of("email", brevoSenderEmail, "name", brevoSenderName),
                            "to", java.util.List.of(Map.of("email", cleanEmail)),
                            "subject", "Vibe Luxe - Your Security Verification Passcode",
                            "textContent", "Hello,\n\nYour One-Time Passcode (OTP) for Vibe Luxe login is: " + otpCode
                                    + "\n\nThis code expires in 5 minutes.\n\nThank you,\nVibe Luxe Concierge Team"
                    ))
                    .retrieve()
                    .toBodilessEntity();
        } catch (Exception e) {
            return ResponseEntity.status(502).body(Map.of(
                    "message", "Unable to send OTP email",
                    "error", "Brevo API request failed"
            ));
        }
        otpTokenRepository.save(new OtpToken(cleanEmail, otpCode, LocalDateTime.now().plusMinutes(5)));

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
            user.setPassword(java.util.UUID.randomUUID().toString());
            user.setRole(Role.Customer);
            user = userRepository.save(user);
        }

        String jwtToken = jwtService.generateToken(user);
        response.addHeader("Set-Cookie", ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true).secure(cookieSecure).sameSite(cookieSecure ? "None" : "Lax")
                .path("/").maxAge(86400).build().toString());

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

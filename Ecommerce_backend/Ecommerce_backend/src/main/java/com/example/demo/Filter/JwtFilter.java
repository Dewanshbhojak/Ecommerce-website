package com.example.demo.Filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.Service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // 1. Allow OPTIONS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extract JWT token from Cookie or Authorization header if present
        Cookie[] cookies = request.getCookies();
        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token == null) {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        // 3. Try setting userId attribute if token exists and is valid
        if (token != null) {
            try {
                if (jwtService.validateToken(token)) {
                    Integer userId = jwtService.extractUserId(token);
                    request.setAttribute("userId", userId);
                }
            } catch (Exception e) {
                // Token invalid or expired
            }
        }

        // 4. Determine if path is public (unauthenticated allowed)
        boolean isPublicPath = path.equals("/api/health")
                || path.startsWith("/api/products")
                || path.startsWith("/api/product")
                || path.startsWith("/api/categories")
                || path.startsWith("/api/auth")
                || path.equals("/api/users/login")
                || path.equals("/api/users/register")
                || path.equals("/api/users/send-otp")
                || path.equals("/api/users/verify-otp")
                || path.equals("/api/users/changePassword")
                || path.equals("/api/users/newPassword");

        if (isPublicPath) {
            filterChain.doFilter(request, response);
            return;
        }

        // 5. For protected routes, require valid userId attribute
        if (request.getAttribute("userId") == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"success\": false, \"message\": \"JWT Token Missing or Invalid\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
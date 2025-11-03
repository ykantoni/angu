package com.anguboot.controllers;

import com.anguboot.repositories.UserRepository;
import com.anguboot.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

@RestController
@RequestScope
//@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:5173"})
public class AuthController {
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil, UserRepository userRepo) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
    }

    @PostMapping("/login")
    public ResponseEntity<UserController.AuthResponse> login(@RequestBody UserController.LoginRequest request) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(request.username(), request.password());
        authManager.authenticate(authToken);
        String token = jwtUtil.generateToken(request.username());
        return ResponseEntity.ok(new UserController.AuthResponse(token));
    }

    @PostMapping("/refresh")
    public ResponseEntity<UserController.AuthResponse> refresh(@RequestBody UserController.LoginRequest request) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(request.username(), request.password());
        authManager.authenticate(authToken);
        String token = jwtUtil.generateToken(request.username());
        return ResponseEntity.ok(new UserController.AuthResponse(token));
    }
}

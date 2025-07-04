package com.example.library_management_utspbold.controller;

import com.example.library_management_utspbold.config.JwtUtil;
import com.example.library_management_utspbold.model.User;
import com.example.library_management_utspbold.model.Role;
import com.example.library_management_utspbold.repository.UserRepository;
import com.example.library_management_utspbold.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.get("username"),
                        loginRequest.get("password")
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateToken(loginRequest.get("username"));
        return ResponseEntity.ok(Collections.singletonMap("token", jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> registerRequest) {
        String username = registerRequest.get("username");
        String password = registerRequest.get("password");
        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Username already exists"));
        }
        Role userRole = roleRepository.findByName("ROLE_USER").orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEnabled(true);
        user.setRoles(new HashSet<>(Arrays.asList(userRole)));
        userRepository.save(user);
        return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Collections.singletonMap("error", "Unauthorized"));
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(Collections.singletonMap("username", userDetails.getUsername()));
    }
} 
package com.baeldung.application.controllers;

import com.baeldung.application.entities.User;
import com.baeldung.application.repositories.UserRepository;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //@GetMapping("/users")
    //public List<User> getUsers() {
//        return (List<User>) userRepository.findAll();
//    }

    @GetMapping("/users")
    public ResponseEntity<String> getUsers() {
        return ResponseEntity.ok("Hello from Spring Boot!");
    }

    @PostMapping("/users")
    void addUser(@RequestBody User user) {
        userRepository.save(user);
    }
}

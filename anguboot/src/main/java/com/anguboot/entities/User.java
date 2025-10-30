package com.anguboot.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

@Entity(name="angu_users")
@Data
public class User {

    static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private final String username;
    private final String password;
    private final String role;
    private final String email;
    private boolean enabled = true;

    public User() {
        this.username = "";
        this.email = "";
        this.password = username;
        this.role = "operator";
    }
    
    public User(String username, String email ) {
        this.username = username;
        this.email = email;
        this.password = passwordEncoder.encode(username);
        this.role = "operator";
    }

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles;


    @Override
    public String toString() {
        return "User{" + "id=" + id + ", name=" + username + ", email=" + email + ", role=" + role + '}';
    }
}

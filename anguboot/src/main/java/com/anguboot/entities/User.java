package com.anguboot.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name="angu_users")
@Data
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private final String username;
    private final String password;
    private final String role;
    private final String email;
    
    public User() {
        this.username = "";
        this.email = "";
        this.password = username;
        this.role = "operator";
    }
    
    public User(String username, String email ) {
        this.username = username;
        this.email = email;
        this.password = username;
        this.role = "operator";
    }
    
    @Override
    public String toString() {
        return "User{" + "id=" + id + ", name=" + username + ", email=" + email + ", role=" + role + '}';
    }
}

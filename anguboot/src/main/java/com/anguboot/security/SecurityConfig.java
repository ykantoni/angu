package com.anguboot.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Slf4j
@Configuration
public class SecurityConfig {

    private static final String SECRET = "replace-with-long-secure-secret-should-be-very-long";
    private static final long EXP = 1000L * 60 * 60 * 24;

    @Autowired
    private JwtAuthenticationEntryPoint authenticationEntryPoint;

    //@Autowired
    //private JwtAuthenticationFilter jwtRequestFilter;

    @Bean
    public JwtUtil jwtUtil() { return new JwtUtil(); }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    public JwtAuthenticationFilter jwtAuthFilter(JwtUtil jwtUtil, CustomUserDetailsService uds) {
        return new JwtAuthenticationFilter(jwtUtil, uds);
    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthFilter) throws Exception {
//        http.csrf(csrf -> csrf.configure(http))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/login", "/public/**").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthFilter) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(au -> {
                au.requestMatchers("/login").permitAll()
                    .requestMatchers("/ping").permitAll()
                    .requestMatchers("/allusers").hasAnyRole("operator")
                    .anyRequest().authenticated();
        })
        .exceptionHandling( ex -> ex.authenticationEntryPoint(authenticationEntryPoint))
        .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


}

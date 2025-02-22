package com.example.library_management_utspbold.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/login").permitAll() // Halaman login bisa diakses tanpa login
                        .requestMatchers("/home").authenticated() // Hanya yang sudah login yang bisa akses /home
                        .requestMatchers("/books/add", "/books/edit/**", "/books/delete/**",
                                                     "/members/add", "/members/edit/**", "/members/delete/**",
                                                     "/loans/add", "/loanss/edit/**", "/loans/delete/**")
                        .hasRole("ADMIN")
                        .requestMatchers("/books", "/members", "/loans").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/h2-console/**").permitAll() // Mengizinkan akses ke H2 Console tanpa autentikasi
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/home", true)
                        .failureUrl("/login?error=true")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )
                .csrf(csrf -> csrf.disable()) // Menonaktifkan CSRF untuk menghindari error di H2 Console
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.disable())); // Mengizinkan penggunaan iframe 
   
        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("admin123"))
                .roles("ADMIN")
                .build();

        UserDetails user = User.builder()
                .username("user")
                .password(passwordEncoder().encode("user123"))
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}



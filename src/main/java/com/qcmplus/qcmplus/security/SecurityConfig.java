package com.qcmplus.qcmplus.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class SecurityConfig {

    private static final String FRONTEND_URL = "http://localhost:3000";
    private static final List<String> ALLOWED_HTTP_METHODS = List.of("GET", "POST", "PUT", "DELETE", "OPTIONS");

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(FRONTEND_URL)); // Set the allowed origin to your frontend URL
        configuration.setAllowedMethods(ALLOWED_HTTP_METHODS); // Allow the specified methods
        configuration.setAllowedHeaders(List.of("*")); // Allow all headers
        configuration.setAllowCredentials(true); // Allow credentials

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(FRONTEND_URL)
                        .allowedMethods(ALLOWED_HTTP_METHODS.toArray(new String[0]))
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}

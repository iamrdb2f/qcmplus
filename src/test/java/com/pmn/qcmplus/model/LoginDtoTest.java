package com.pmn.qcmplus.model;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class LoginDtoTest {

    @Test
    void testNoArgsConstructor() {
        LoginDto loginDto = new LoginDto();
        assertNull(loginDto.getEmail());
        assertNull(loginDto.getPassword());
    }

    @Test
    void testAllArgsConstructor() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "password123";
        String encodedPassword = encoder.encode(rawPassword);

        LoginDto loginDto = new LoginDto("test@example.com", encodedPassword);
        assertEquals("test@example.com", loginDto.getEmail());
        assertTrue(encoder.matches(rawPassword, loginDto.getPassword()));
    }

    @Test
    void testSettersAndGetters() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "securepassword";
        String encodedPassword = encoder.encode(rawPassword);

        LoginDto loginDto = new LoginDto();
        loginDto.setEmail("user@example.com");
        loginDto.setPassword(encodedPassword);

        assertEquals("user@example.com", loginDto.getEmail());
        assertTrue(encoder.matches(rawPassword, loginDto.getPassword()));
    }

    @Test
    void testEqualsAndHashCode() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "securepassword";
        String encodedPassword1 = encoder.encode(rawPassword);
        String encodedPassword2 = encoder.encode(rawPassword);

        LoginDto loginDto1 = new LoginDto("user@example.com", encodedPassword1);
        LoginDto loginDto2 = new LoginDto("user@example.com", encodedPassword2);

        assertEquals(loginDto1.getEmail(), loginDto2.getEmail());
        assertTrue(encoder.matches(rawPassword, loginDto1.getPassword()));
        assertTrue(encoder.matches(rawPassword, loginDto2.getPassword()));
    }
}

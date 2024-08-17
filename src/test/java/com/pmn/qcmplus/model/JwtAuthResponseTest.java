package com.pmn.qcmplus.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class JwtAuthResponseTest {

    @Test
    void testNoArgsConstructor() {
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        assertNull(jwtAuthResponse.getAccessToken());
        assertNull(jwtAuthResponse.getUserEmail());
        assertNull(jwtAuthResponse.getUserLastName());
        assertNull(jwtAuthResponse.getUserFirstName());
        assertNull(jwtAuthResponse.getRole());
        assertNull(jwtAuthResponse.getUserJob());
    }

    @Test
    void testAllArgsConstructor() {
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse(
                1,
                "token123",

                "user@example.com",
                "Doe",
                "John",
                "Admin",
                "Developer"
        );

        assertEquals("token123", jwtAuthResponse.getAccessToken());
        assertEquals("user@example.com", jwtAuthResponse.getUserEmail());
        assertEquals("Doe", jwtAuthResponse.getUserLastName());
        assertEquals("John", jwtAuthResponse.getUserFirstName());
        assertEquals("Admin", jwtAuthResponse.getRole());
        assertEquals("Developer", jwtAuthResponse.getUserJob());
    }

    @Test
    void testSettersAndGetters() {
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken("token123");
        jwtAuthResponse.setUserEmail("user@example.com");
        jwtAuthResponse.setUserLastName("Doe");
        jwtAuthResponse.setUserFirstName("John");
        jwtAuthResponse.setRole("Admin");
        jwtAuthResponse.setUserJob("Developer");

        assertEquals("token123", jwtAuthResponse.getAccessToken());
        assertEquals("user@example.com", jwtAuthResponse.getUserEmail());
        assertEquals("Doe", jwtAuthResponse.getUserLastName());
        assertEquals("John", jwtAuthResponse.getUserFirstName());
        assertEquals("Admin", jwtAuthResponse.getRole());
        assertEquals("Developer", jwtAuthResponse.getUserJob());
    }

    @Test
    void testEqualsAndHashCode() {
        JwtAuthResponse jwtAuthResponse1 = new JwtAuthResponse(
                1,
                "token123",

                "user@example.com",
                "Doe",
                "John",
                "Admin",
                "Developer"
        );

        JwtAuthResponse jwtAuthResponse2 = new JwtAuthResponse(
                1,
                "token123",

                "user@example.com",
                "Doe",
                "John",
                "Admin",
                "Developer"
        );

        assertEquals(jwtAuthResponse1, jwtAuthResponse2);
        assertEquals(jwtAuthResponse1.hashCode(), jwtAuthResponse2.hashCode());

        JwtAuthResponse jwtAuthResponse3 = new JwtAuthResponse(
                1,
                "token456",

                "user@example.com",
                "Doe",
                "John",
                "User",
                "Designer"
        );

        assertNotEquals(jwtAuthResponse1, jwtAuthResponse3);
        assertNotEquals(jwtAuthResponse1.hashCode(), jwtAuthResponse3.hashCode());
    }
}

package com.pmn.qcmplus.security;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import java.util.Base64;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;

class JwtTokenProviderTest {

    @Mock
    private Authentication authentication;

    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        jwtTokenProvider = spy(new JwtTokenProvider());

        // Generate a dynamic secret key
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        String generatedKey = Base64.getEncoder().encodeToString(key.getEncoded());
        // Set jwtSecret with the dynamically generated key
        setPrivateField(jwtTokenProvider, "jwtSecret", generatedKey);
        // Set jwtExpirationDate
        setPrivateField(jwtTokenProvider, "jwtExpirationDate", 3600000L);  // 1 hour in milliseconds
    }

    @Test
    void testGenerateToken() {
        // Arrange
        when(authentication.getName()).thenReturn("testUser");

        // Act
        String token = jwtTokenProvider.generateToken(authentication);

        // Assert
        assertNotNull(token);
        String username = jwtTokenProvider.getUsername(token);
        assertEquals("testUser", username);
    }

    @Test
    void testGetUsername() {
        // Arrange
        when(authentication.getName()).thenReturn("testUser");
        String token = jwtTokenProvider.generateToken(authentication);

        // Act
        String username = jwtTokenProvider.getUsername(token);

        // Assert
        assertEquals("testUser", username);
    }

    @Test
    void testValidateToken_ValidToken() {
        // Arrange
        when(authentication.getName()).thenReturn("testUser");
        String token = jwtTokenProvider.generateToken(authentication);

        // Act
        boolean isValid = jwtTokenProvider.validateToken(token);

        // Assert
        assertTrue(isValid);
    }

    @Test
    void testValidateToken_InvalidToken() {
        // Act
        boolean isValid = jwtTokenProvider.validateToken("invalid-token");

        // Assert
        assertFalse(isValid);
    }

    @Test
    void testValidateToken_ExpiredToken() throws InterruptedException {
        // Arrange
        setPrivateField(jwtTokenProvider, "jwtExpirationDate", 1L);
        when(authentication.getName()).thenReturn("testUser");
        String token = jwtTokenProvider.generateToken(authentication);

        // Wait for the token to expire
        Thread.sleep(10);

        // Act
        boolean isValid = jwtTokenProvider.validateToken(token);

        // Assert
        assertFalse(isValid);
    }

    // Helper method to set private fields using reflection
    private void setPrivateField(Object target, String fieldName, Object value) {
        try {
            java.lang.reflect.Field field = target.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            field.set(target, value);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}

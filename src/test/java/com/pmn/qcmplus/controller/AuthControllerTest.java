package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.JwtAuthResponse;
import com.pmn.qcmplus.model.LoginDto;
import com.pmn.qcmplus.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin() {

        LoginDto loginDto = new LoginDto("user@example.com", "password123");
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse("mockedJwtToken", "Bearer", "user@example.com", "Doe", "John", "ROLE_USER", "Developer");

        when(authService.login(loginDto)).thenReturn(jwtAuthResponse);

        ResponseEntity<JwtAuthResponse> response = authController.login(loginDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(jwtAuthResponse, response.getBody());
        verify(authService, times(1)).login(loginDto);
    }
}


package com.pmn.qcmplus.config;

import com.pmn.qcmplus.security.JwtAuthenticationEntryPoint;
import com.pmn.qcmplus.security.JwtAuthenticationFilter;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private SecurityConfig securityConfig;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    /*

    //TODO UPDATE TEST
    @Test
    @Disabled
    void testAuthenticatedRequest() throws Exception {
        // Assuming "/api/users" endpoint exists and is secured.
        // Simulate a request without authentication
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isUnauthorized()); // Expect 401 Unauthorized if the user is not authenticated
    }
    //TODO UPDATE TEST
    @Test
    @Disabled
    void testAuthenticatedRequestWithRole() throws Exception {
        // Simulate a request with proper authentication but without the required role
        mockMvc.perform(get("/api/users").header("Authorization", "Bearer VALID_JWT_TOKEN"))
                .andExpect(status().isForbidden()); // Expect 403 Forbidden if the user lacks the required role
    }
    */
}

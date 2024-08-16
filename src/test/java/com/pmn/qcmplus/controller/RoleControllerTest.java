package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.service.RoleService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class RoleControllerTest {

    private MockMvc mockMvc;

    @Mock
    private RoleService roleService;

    @InjectMocks
    private RoleController roleController;

    public RoleControllerTest() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(roleController).build();
    }

    @Test
    public void testGetAllRoles() throws Exception {
        Role role1 = new Role(1, "ADMIN");
        Role role2 = new Role(2, "USER");
        when(roleService.getAllRoles()).thenReturn(Arrays.asList(role1, role2));

        mockMvc.perform(get("/api/roles"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].roleName").value("ADMIN"))
                .andExpect(jsonPath("$[1].roleName").value("USER"));
    }
}

package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.service.RoleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

class RoleControllerTest {

    @Mock
    private RoleService roleService;

    @InjectMocks
    private RoleController roleController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateRole() {
        Role role = new Role();
        role.setRoleName("ADMIN");

        when(roleService.createRole(any(Role.class))).thenReturn(role);

        ResponseEntity<Role> response = roleController.createRole(role);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(role, response.getBody());
    }

    @Test
    void testGetRoleById_Found() {
        Role role = new Role();
        role.setId(1);
        role.setRoleName("ADMIN");

        when(roleService.getRoleById(1)).thenReturn(role);

        ResponseEntity<Role> response = roleController.getRoleById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(role, response.getBody());
    }

    @Test
    void testGetRoleById_NotFound() {
        when(roleService.getRoleById(1)).thenReturn(null);

        ResponseEntity<Role> response = roleController.getRoleById(1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testGetAllRoles() {
        List<Role> roles = Arrays.asList(new Role(), new Role());
        when(roleService.getAllRoles()).thenReturn(roles);

        ResponseEntity<List<Role>> response = roleController.getAllRoles();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(roles, response.getBody());
    }

    @Test
    void testUpdateRole_Found() {
        Role role = new Role();
        role.setId(1);
        role.setRoleName("USER");

        when(roleService.updateRole(eq(1), any(Role.class))).thenReturn(role);

        ResponseEntity<Role> response = roleController.updateRole(1, role);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(role, response.getBody());
    }

    @Test
    void testUpdateRole_NotFound() {
        when(roleService.updateRole(eq(1), any(Role.class))).thenReturn(null);

        ResponseEntity<Role> response = roleController.updateRole(1, new Role());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testDeleteRole() {
        doNothing().when(roleService).deleteRole(1);

        ResponseEntity<Void> response = roleController.deleteRole(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(roleService, times(1)).deleteRole(1);
    }
}

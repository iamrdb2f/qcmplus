package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.exception.AdminEmailAlreadyInUseException;
import com.qcmplus.qcmplus.exception.AdminNotFoundException;
import com.qcmplus.qcmplus.model.Admin;
import com.qcmplus.qcmplus.service.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class AdminControllerTest {

    @InjectMocks
    private AdminController adminController;

    @Mock
    private AdminService adminService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllAdmins() {
        List<Admin> admins = Arrays.asList(new Admin(), new Admin());
        when(adminService.getAllAdmins()).thenReturn(admins);

        ResponseEntity<List<Admin>> response = adminController.getAllAdmins();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, Objects.requireNonNull(response.getBody()).size());
        verify(adminService, times(1)).getAllAdmins();
    }

    @Test
    public void testGetAdminById() {
        Admin admin = new Admin();
        when(adminService.getAdminById(1L)).thenReturn(Optional.of(admin));

        ResponseEntity<Admin> response = adminController.getAdminById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(admin, response.getBody());
        verify(adminService, times(1)).getAdminById(1L);
    }

    @Test
    public void testGetAdminById_NotFound() {
        when(adminService.getAdminById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Admin> response = adminController.getAdminById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(adminService, times(1)).getAdminById(1L);
    }

    @Test
    public void testCreateAdmin() {
        Admin admin = new Admin();
        when(adminService.saveAdmin(any(Admin.class))).thenReturn(admin);

        ResponseEntity<Admin> response = adminController.createAdmin(admin);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(admin, response.getBody());
        verify(adminService, times(1)).saveAdmin(admin);
    }

    @Test
    public void testCreateAdmin_EmailAlreadyInUse() {
        Admin admin = new Admin();
        doThrow(new AdminEmailAlreadyInUseException("Email already in use")).when(adminService).saveAdmin(any(Admin.class));

        ResponseEntity<Admin> response = adminController.createAdmin(admin);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verify(adminService, times(1)).saveAdmin(admin);
    }

    @Test
    public void testUpdateAdmin() {
        Admin admin = new Admin();
        when(adminService.updateAdmin(anyLong(), any(Admin.class))).thenReturn(admin);

        ResponseEntity<?> response = adminController.updateAdmin(1L, admin);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(admin, response.getBody());
        verify(adminService, times(1)).updateAdmin(1L, admin);
    }

    @Test
    public void testUpdateAdmin_EmailAlreadyInUse() {
        Admin admin = new Admin();
        doThrow(new AdminEmailAlreadyInUseException("Email already in use")).when(adminService).updateAdmin(anyLong(), any(Admin.class));

        ResponseEntity<?> response = adminController.updateAdmin(1L, admin);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Email Email already in use is already in use by another user.", response.getBody());
        verify(adminService, times(1)).updateAdmin(1L, admin);
    }

    @Test
    public void testDeleteAdmin() {
        when(adminService.existsById(1L)).thenReturn(true);
        doNothing().when(adminService).deleteAdmin(1L);

        ResponseEntity<String> response = adminController.deleteAdmin(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Admin with ID 1 deleted successfully", response.getBody());
        verify(adminService, times(1)).existsById(1L);
        verify(adminService, times(1)).deleteAdmin(1L);
    }

    @Test
    public void testDeleteAdmin_NotFound() {
        when(adminService.existsById(1L)).thenReturn(false);

        try {
            adminController.deleteAdmin(1L);
        } catch (AdminNotFoundException e) {
            assertEquals("Admin with ID 1 does not exist", e.getMessage());
        }

        verify(adminService, times(1)).existsById(1L);
        verify(adminService, times(0)).deleteAdmin(1L);
    }
}

package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.model.Admin;
import com.qcmplus.qcmplus.service.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AdminControllerTest {

    @Mock
    private AdminService adminService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllAdmins() {
        Admin admin = new Admin();
        // set up your admin attributes
        when(adminService.getAllAdmins()).thenReturn(Collections.singletonList(admin));

        List<Admin> result = adminController.getAllAdmins();

        assertEquals(1, result.size());
        // do additional assertions

        verify(adminService, times(1)).getAllAdmins();
    }

    @Test
    void testGetAdminById() {
        Admin admin = new Admin();
        // set up your admin attributes
        when(adminService.getAdminById(1L)).thenReturn(Optional.of(admin));

        ResponseEntity<Admin> result = adminController.getAdminById(1L);

        assertEquals(ResponseEntity.ok(admin), result);

        verify(adminService, times(1)).getAdminById(1L);
    }

    @Test
    void testCreateAdmin() throws Exception {
        Admin admin = new Admin();
        // set up your admin attributes
        when(adminService.saveAdmin(admin)).thenReturn(admin);

        ResponseEntity<Admin> result = adminController.createAdmin(admin);

        assertEquals(new ResponseEntity<>(admin, HttpStatus.CREATED), result);

        verify(adminService, times(1)).saveAdmin(admin);
    }

    @Test
    void testUpdateAdmin() throws Exception {
        Admin adminDetails = new Admin();
        Admin updatedAdmin = new Admin();
        // set up your admin and updatedAdmin attributes
        when(adminService.updateAdmin(1L, adminDetails)).thenReturn(updatedAdmin);

        ResponseEntity<Admin> result = adminController.updateAdmin(1L, adminDetails);

        assertEquals(ResponseEntity.ok(updatedAdmin), result);

        verify(adminService, times(1)).updateAdmin(1L, adminDetails);
    }

    @Test
    void testDeleteAdmin() {
        String expectedResponse = "Admin with id 1 deleted successfully";
        // no when() as the method deleteAdmin() doesn't return anything.

        ResponseEntity<String> result = adminController.deleteAdmin(1L);

        assertEquals(new ResponseEntity<>(expectedResponse, HttpStatus.OK), result);

        verify(adminService, times(1)).deleteAdmin(1L);
    }
}
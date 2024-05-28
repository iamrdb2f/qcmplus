package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.Admin;
import com.qcmplus.qcmplus.repository.AdminRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class AdminServiceTest {

    @InjectMocks
    private AdminService adminService;

    @Mock
    private AdminRepository adminRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllAdmins() {
        when(adminRepository.findAll()).thenReturn(Arrays.asList(new Admin()));
        assertEquals(1, adminService.getAllAdmins().size());
    }

    @Test
    public void testGetAdminById() {
        Admin admin = new Admin();
        admin.setUserId(1);
        when(adminRepository.findById(1L)).thenReturn(Optional.of(admin));
        Optional<Admin> resultAdmin = adminService.getAdminById(1L);
        assertEquals(admin.getUserId(), resultAdmin.get().getUserId());
    }

    @Test
    public void testSaveAdmin() throws Exception {
        Admin admin = new Admin();
        when(adminRepository.save(any(Admin.class))).thenReturn(admin);
        assertEquals(admin, adminService.saveAdmin(new Admin()));
    }

    @Test
    public void testDeleteAdmin() {
        adminService.deleteAdmin(1L);
        verify(adminRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testUpdateAdmin() throws Exception {
        Long id = 1L;
        Admin oldAdmin = new Admin();
        oldAdmin.setUserId(Math.toIntExact(id));
        oldAdmin.setLastName("Doe");
        oldAdmin.setFirstName("John");
        oldAdmin.setEmail("john@example.com");
        oldAdmin.setPassword("123456");

        Admin newAdminDetails = new Admin();
        newAdminDetails.setLastName("Snow");
        newAdminDetails.setFirstName("John");
        newAdminDetails.setEmail("john_snow@example.com");
        newAdminDetails.setPassword("123456");

        when(adminRepository.findById(id)).thenReturn(Optional.of(oldAdmin));
        when(adminRepository.findByEmailAndUserIdNot(any(), any())).thenReturn(Optional.empty());
        when(adminRepository.save(any(Admin.class))).thenReturn(newAdminDetails);

        Admin updatedAdmin = adminService.updateAdmin(id, newAdminDetails);

        ArgumentCaptor<Admin> adminArgumentCaptor = ArgumentCaptor.forClass(Admin.class);
        verify(adminRepository).save(adminArgumentCaptor.capture());

        // check properties
        assertEquals(newAdminDetails.getLastName(), updatedAdmin.getLastName());
        assertEquals(newAdminDetails.getFirstName(), updatedAdmin.getFirstName());
        assertEquals(newAdminDetails.getEmail(), updatedAdmin.getEmail());
        assertEquals(newAdminDetails.getPassword(), updatedAdmin.getPassword());
    }

    @Test
    public void testVerifyEmail() throws Exception {
        Admin admin = new Admin();
        admin.setUserId(1);
        admin.setEmail("john@example.com");
        when(adminRepository.findByEmailAndUserIdNot(admin.getEmail(), admin.getUserId())).thenReturn(Optional.empty());
        adminService.verifyEmail(admin); // expect not to throw
    }
}
package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.Admin;
import com.qcmplus.qcmplus.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Admin saveAdmin(Admin admin) throws Exception {
        verifyEmail(admin);
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public Admin updateAdmin(Long id, Admin adminDetails) throws Exception {
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            verifyEmail(admin);
            admin.setLastName(adminDetails.getLastName());
            admin.setFirstName(adminDetails.getFirstName());
            admin.setEmail(adminDetails.getEmail());
            admin.setPassword(adminDetails.getPassword());
            return adminRepository.save(admin);
        } else {
            throw new Exception("Admin not found with id " + id);
        }
    }

    void verifyEmail(Admin admin) throws Exception {
        Optional<Admin> existingAdmin = adminRepository.findByEmailAndUserIdNot(admin.getEmail(), admin.getUserId());
        if (existingAdmin.isPresent()) {
            throw new Exception("Email " + admin.getEmail() + " is already in use by another user.");
        }
    }
}

package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.exception.AdminEmailAlreadyInUseException;
import com.qcmplus.qcmplus.exception.AdminNotFoundException;
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

    public boolean existsById(Long id) {
        return adminRepository.existsById(id);
    }

    public Admin saveAdmin(Admin admin) {
        verifyEmail(admin);
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public Admin updateAdmin(Long id, Admin adminDetails) {
        // Verify if email is already in use by another admin
        verifyEmail(adminDetails);

        Admin admin = adminRepository.findById(id).orElseThrow(() -> new AdminNotFoundException(Math.toIntExact(id)));
        admin.setFirstName(adminDetails.getFirstName());
        admin.setLastName(adminDetails.getLastName());
        admin.setEmail(adminDetails.getEmail());
        admin.setUserRole(adminDetails.getUserRole());
        admin.setGender(adminDetails.getGender());
        admin.setCompany(adminDetails.getCompany());
        admin.setJobTitle(adminDetails.getJobTitle());
        admin.setPhoneNumber(adminDetails.getPhoneNumber());
        return adminRepository.save(admin);
    }

    void verifyEmail(Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByEmailAndUserIdNot(admin.getEmail(), admin.getUserId());
        if (existingAdmin.isPresent()) {
            throw new AdminEmailAlreadyInUseException(admin.getEmail());
        }
    }
}

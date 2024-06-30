package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.exception.AdminEmailAlreadyInUseException;
import com.qcmplus.qcmplus.exception.AdminNotFoundException;
import com.qcmplus.qcmplus.model.Admin;
import com.qcmplus.qcmplus.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin") // New request mapping at the controller level.
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return new ResponseEntity<>(adminService.getAllAdmins(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        Optional<Admin> admin = adminService.getAdminById(id);
        return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        try {
            Admin savedAdmin = adminService.saveAdmin(admin);
            return new ResponseEntity<>(savedAdmin, HttpStatus.CREATED);
        } catch (AdminEmailAlreadyInUseException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
        try {
            Admin updatedAdmin = adminService.updateAdmin(id, adminDetails);
            return ResponseEntity.ok(updatedAdmin);
        } catch (AdminEmailAlreadyInUseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        if(adminService.existsById(id)) {
            adminService.deleteAdmin(id);
            return new ResponseEntity<>("Admin with ID " + id + " deleted successfully", HttpStatus.OK);
        } else {
            throw new AdminNotFoundException(Math.toIntExact(id));
        }
    }
}
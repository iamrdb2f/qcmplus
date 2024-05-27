package com.qcmplus.qcmplus.repository;

import com.qcmplus.qcmplus.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmailAndUserIdNot(String email, Integer userId);
}

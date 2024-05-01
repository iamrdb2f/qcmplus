package com.qcmplus.qcmplus.repository;

import com.qcmplus.qcmplus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // This inherits the CRUD and findAll operations from JpaRepository
}

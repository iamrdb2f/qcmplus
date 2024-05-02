package com.qcmplus.qcmplus.repository;

import com.qcmplus.qcmplus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // This inherits the CRUD and findAll operations from JpaRepository
    Optional<User> findByEmailAndUserIdNot(String email, Integer userId);

}

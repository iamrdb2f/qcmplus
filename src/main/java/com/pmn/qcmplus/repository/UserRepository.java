package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailAndIdNot(String email, Integer  userId);
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
}

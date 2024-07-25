package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findById(@Param("id") Integer id);
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndIdNot(String email, Integer id);
    Boolean existsByEmail(String email);
}



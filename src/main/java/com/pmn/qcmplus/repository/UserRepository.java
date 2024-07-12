package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndIdNot(String email, Long  userId);
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);

}

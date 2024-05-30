package com.qcmplus.qcmplus.repository;

import com.qcmplus.qcmplus.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    Optional<Trainer> findByEmailAndUserIdNot(String email, Integer userId);
}

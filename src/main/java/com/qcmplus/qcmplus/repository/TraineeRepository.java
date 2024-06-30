package com.qcmplus.qcmplus.repository;


import com.qcmplus.qcmplus.model.Admin;
import com.qcmplus.qcmplus.model.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TraineeRepository extends JpaRepository<Trainee, Long> {
    Optional<Trainee> findByEmailAndUserIdNot(String email, Integer userId);
}

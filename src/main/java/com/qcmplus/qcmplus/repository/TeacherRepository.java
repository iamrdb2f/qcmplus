package com.qcmplus.qcmplus.repository;

import com.qcmplus.qcmplus.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByEmailAndUserIdNot(String email, Integer userId);
}

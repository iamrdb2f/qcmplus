package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.ExamSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamSessionRepository extends JpaRepository<ExamSession, Integer> {
    List<ExamSession> findByUserId(Integer userId);
}

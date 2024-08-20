package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.ExamSession;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamSessionRepository extends JpaRepository<ExamSession, Integer> {
    List<ExamSession> findByUserId(Integer userId);
}

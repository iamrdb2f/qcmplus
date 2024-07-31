package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {
}

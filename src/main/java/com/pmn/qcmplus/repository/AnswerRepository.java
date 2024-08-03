package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findByQuestion_QuestionId(Integer questionId);
}

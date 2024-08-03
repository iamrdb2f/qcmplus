package com.pmn.qcmplus.repository;


import com.pmn.qcmplus.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByQuiz_QuizId(Integer quizId);
}
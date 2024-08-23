package com.pmn.qcmplus.repository;


import com.pmn.qcmplus.model.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByQuiz_QuizId(Integer quizId);

    Question findByQuestionTextContainingIgnoreCase(String questionText);
}
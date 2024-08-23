package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.exception.QuizNotFoundException;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.repository.QuizRepository;
import com.pmn.qcmplus.service.QuizService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz getQuizById(Integer quizId) {
        return quizRepository.findById(quizId)
                .orElseThrow(() -> new QuizNotFoundException(quizId));
    }

    @Override
    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Integer quizId, Quiz quizDetails) {
        Quiz quiz = getQuizById(quizId);
        quiz.setTitle(quizDetails.getTitle());
        quiz.setDescription(quizDetails.getDescription());
        return quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Integer quizId) {
        Quiz quiz = getQuizById(quizId);
        quizRepository.delete(quiz);
    }
}
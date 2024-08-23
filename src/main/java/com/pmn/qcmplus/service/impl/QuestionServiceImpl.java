package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.exception.QuestionNotFoundException;
import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.repository.QuestionRepository;
import com.pmn.qcmplus.repository.QuizRepository;
import com.pmn.qcmplus.service.QuestionService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository, QuizRepository quizRepository) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
    }

    @Override
    public List<Question> getQuestionsByQuizId(Integer quizId) {
        return questionRepository.findByQuiz_QuizId(quizId);
    }

    @Override
    public Question getQuestionById(Integer id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException(id));
    }

    @Override
    public Question saveQuestion(Question question) {
        if (question == null) {
            throw new IllegalArgumentException("Question cannot be null.");
        }
        if (question.getQuiz() == null || question.getQuiz().getQuizId() == null) {
            throw new IllegalArgumentException("Quiz or Quiz ID cannot be null.");
        }

        Optional<Quiz> quiz = quizRepository.findById(question.getQuiz().getQuizId());
        if (quiz.isEmpty()) {
            throw new IllegalArgumentException("Quiz does not exist.");
        }

        return questionRepository.save(question);
    }


    @Override
    public Question updateQuestion(Question question) {
        if (question == null) {
            throw new IllegalArgumentException("Question cannot be null.");
        }
        if (question.getQuiz() == null || question.getQuiz().getQuizId() == null) {
            throw new IllegalArgumentException("Quiz or Quiz ID cannot be null.");
        }

        Optional<Quiz> quiz = quizRepository.findById(question.getQuiz().getQuizId());
        if (quiz.isEmpty()) {
            throw new IllegalArgumentException("Quiz does not exist.");
        }

        Optional<Question> existingQuestion = questionRepository.findById(question.getQuestionId());
        if (existingQuestion.isEmpty()) {
            throw new QuestionNotFoundException(question.getQuestionId());
        }

        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Integer id) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isEmpty()) {
            throw new QuestionNotFoundException(id);
        }
        questionRepository.deleteById(id);
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }


    public Question getQuestionsByText(String questionText) {
        return questionRepository.findByQuestionTextContainingIgnoreCase(questionText);
    }
}
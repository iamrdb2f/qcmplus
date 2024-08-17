package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.repository.QuestionRepository;
import com.pmn.qcmplus.repository.QuizRepository;
import com.pmn.qcmplus.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
                .orElseThrow(() -> new IllegalArgumentException("Question not found with id: " + id));
    }


    @Override
    public Question saveQuestion(Question question) {
        // Validate that the quiz exists
        Optional<Quiz> quiz = quizRepository.findById(question.getQuiz().getQuizId());
        if (quiz.isEmpty()) {
            throw new IllegalArgumentException("Quiz does not exist.");
        }

        // Save the question
        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Integer id) {
        // Validate that the question exists
        Optional<Question> question = questionRepository.findById(id);
        if (question.isEmpty()) {
            throw new IllegalArgumentException("Question does not exist.");
        }

        // Delete the question
        questionRepository.deleteById(id);
    }
}

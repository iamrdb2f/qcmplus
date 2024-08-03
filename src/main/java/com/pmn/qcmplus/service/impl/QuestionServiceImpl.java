package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.repository.QuestionRepository;
import com.pmn.qcmplus.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> getQuestionsByQuizId(Integer quizId) {
        return questionRepository.findByQuiz_QuizId(quizId);
    }

    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    public void deleteQuestion(Integer id) {
        questionRepository.deleteById(id);
    }
}

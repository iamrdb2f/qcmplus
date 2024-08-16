package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.repository.AnswerRepository;
import com.pmn.qcmplus.repository.QuestionRepository;
import com.pmn.qcmplus.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public AnswerServiceImpl(AnswerRepository answerRepository, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public List<Answer> getAnswersByQuestionId(Integer questionId) {
        return answerRepository.findByQuestion_QuestionId(questionId);
    }

    @Override
    public Answer getAnswerById(Integer id) {
        return answerRepository.findById(id).orElse(null);
    }

    @Override
    public Answer saveAnswer(Answer answer) {
        // Validate that the question exists
        Optional<Question> question = questionRepository.findById(answer.getQuestion().getQuestionId());
        if (question.isEmpty()) {
            throw new IllegalArgumentException("Question does not exist.");
        }

        // Save the answer
        return answerRepository.save(answer);
    }

    @Override
    public void deleteAnswer(Integer id) {
        // Validate that the answer exists
        Optional<Answer> answer = answerRepository.findById(id);
        if (answer.isEmpty()) {
            throw new IllegalArgumentException("Answer does not exist.");
        }

        // Delete the answer
        answerRepository.deleteById(id);
    }
}

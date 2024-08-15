package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.repository.AnswerRepository;
import com.pmn.qcmplus.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    public List<Answer> getAnswersByQuestionId(Integer questionId) {
        return answerRepository.findByQuestion_QuestionId(questionId);
    }

    public Answer getAnswerById(Integer id) {
        return answerRepository.findById(id).orElse(null);
    }

    public Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public void deleteAnswer(Integer id) {
        answerRepository.deleteById(id);
    }
}

package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.Answer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnswerService {


    List<Answer> getAnswersByQuestionId(Integer questionId);

    Answer getAnswerById(Integer id);

    Answer saveAnswer(Answer answer);

    void deleteAnswer(Integer id);
}

package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.Answer;
import java.util.List;

public interface AnswerService {

    List<Answer> getAnswersByQuestionId(Integer questionId);

    Answer getAnswerById(Integer id);

    Answer saveAnswer(Answer answer);

    void deleteAnswer(Integer id);
}

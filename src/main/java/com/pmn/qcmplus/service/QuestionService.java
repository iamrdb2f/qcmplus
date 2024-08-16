package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.Question;
import java.util.List;

public interface QuestionService {

    List<Question> getQuestionsByQuizId(Integer quizId);

    Question getQuestionById(Integer id);

    Question saveQuestion(Question question);

    void deleteQuestion(Integer id);
}

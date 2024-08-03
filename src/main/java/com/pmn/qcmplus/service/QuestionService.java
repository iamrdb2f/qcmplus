package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.Question;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionService {

     List<Question> getQuestionsByQuizId(Integer quizId);
     Question saveQuestion(Question question) ;
     void deleteQuestion(Integer id);
}

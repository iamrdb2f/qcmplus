package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.UserAnswer;
import java.util.List;

public interface UserAnswerService {
    UserAnswer saveUserAnswer(UserAnswer userAnswer);
    UserAnswer getUserAnswerById(Integer id);
    List<UserAnswer> getAllUserAnswers();
    UserAnswer updateUserAnswer(Integer id, UserAnswer userAnswer);
    void deleteUserAnswer(Integer id);
}

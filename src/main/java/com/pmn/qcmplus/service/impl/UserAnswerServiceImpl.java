package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.UserAnswer;
import com.pmn.qcmplus.repository.UserAnswerRepository;
import com.pmn.qcmplus.service.UserAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAnswerServiceImpl implements UserAnswerService {
    
    private final UserAnswerRepository userAnswerRepository;

    @Autowired
    public UserAnswerServiceImpl(UserAnswerRepository userAnswerRepository) {
        this.userAnswerRepository = userAnswerRepository;
    }

    @Override
    public UserAnswer saveUserAnswer(UserAnswer userAnswer) {
        return userAnswerRepository.save(userAnswer);
    }

    @Override
    public UserAnswer getUserAnswerById(Integer id) {
        return userAnswerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("UserAnswer not found with id: " + id));
    }

    @Override
    public List<UserAnswer> getAllUserAnswers() {
        return userAnswerRepository.findAll();
    }

    @Override
    public UserAnswer updateUserAnswer(Integer id, UserAnswer userAnswerDetails) {
        UserAnswer userAnswer = getUserAnswerById(id);
        userAnswer.setSession(userAnswerDetails.getSession());
        userAnswer.setAnswer(userAnswerDetails.getAnswer());
        return userAnswerRepository.save(userAnswer);
    }

    @Override
    public void deleteUserAnswer(Integer id) {
        UserAnswer userAnswer = getUserAnswerById(id);
        userAnswerRepository.delete(userAnswer);
    }
}

package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.exception.ExamSessionNotFoundException;
import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.repository.ExamSessionRepository;
import com.pmn.qcmplus.service.ExamSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamSessionServiceImpl implements ExamSessionService {
    
    private final ExamSessionRepository examSessionRepository;

    @Autowired
    public ExamSessionServiceImpl(ExamSessionRepository examSessionRepository) {
        this.examSessionRepository = examSessionRepository;
    }

    public List<ExamSession> getExamSessionsByUserId(Integer userId) {
        return examSessionRepository.findByUserId(userId);
    }

    @Override
    public ExamSession saveExamSession(ExamSession examSession) {
        return examSessionRepository.save(examSession);
    }

    @Override
    public ExamSession getExamSessionById(Integer sessionId) {
        return examSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ExamSessionNotFoundException(sessionId));
    }

    @Override
    public List<ExamSession> getAllExamSessions() {
        return examSessionRepository.findAll();
    }

    @Override
    public ExamSession updateExamSession(Integer sessionId, ExamSession examSessionDetails) {
        ExamSession examSession = getExamSessionById(sessionId);
        examSession.setUser(examSessionDetails.getUser());
        examSession.setQuiz(examSessionDetails.getQuiz());
        examSession.setScore(examSessionDetails.getScore());
        examSession.setTimeSpent(examSessionDetails.getTimeSpent());
        return examSessionRepository.save(examSession);
    }

    @Override
    public void deleteExamSession(Integer sessionId) {
        ExamSession examSession = getExamSessionById(sessionId);
        examSessionRepository.delete(examSession);
    }

}

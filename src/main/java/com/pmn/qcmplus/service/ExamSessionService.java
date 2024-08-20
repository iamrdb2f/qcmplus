package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.ExamSession;
import java.util.List;

public interface ExamSessionService {
    ExamSession saveExamSession(ExamSession examSession);
    ExamSession getExamSessionById(Integer sessionId);

    List<ExamSession> getExamSessionsByUserId(Integer userId);
    List<ExamSession> getAllExamSessions();
    ExamSession updateExamSession(Integer sessionId, ExamSession examSession);
    void deleteExamSession(Integer sessionId);
}

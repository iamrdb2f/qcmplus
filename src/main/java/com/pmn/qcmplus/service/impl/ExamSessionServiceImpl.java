package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.repository.ExamSessionRepository;
import com.pmn.qcmplus.service.ExamSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamSessionServiceImpl implements ExamSessionService {
    private final ExamSessionRepository examSessionRepository;

    @Autowired
    public ExamSessionServiceImpl(ExamSessionRepository examSessionRepository) {
        this.examSessionRepository = examSessionRepository;
    }


    public ExamSession saveExamSession(ExamSession examSession) {
        return examSessionRepository.save(examSession);
    }
}

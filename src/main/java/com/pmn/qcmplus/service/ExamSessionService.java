package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.ExamSession;
import org.springframework.stereotype.Service;

@Service
public interface ExamSessionService {
    ExamSession saveExamSession(ExamSession examSession);
}

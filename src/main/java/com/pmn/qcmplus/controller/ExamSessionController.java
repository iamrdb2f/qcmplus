package com.pmn.qcmplus.controller;


import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.service.ExamSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exam_sessions")
public class ExamSessionController {

    private final ExamSessionService examSessionService;

    @Autowired
    public ExamSessionController(ExamSessionService examSessionService) {
        this.examSessionService = examSessionService;
    }

    @PostMapping
    public ExamSession submitExamSession(@RequestBody ExamSession examSession) {
        return examSessionService.saveExamSession(examSession);
    }
}

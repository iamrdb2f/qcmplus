package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.service.ExamSessionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/exam_sessions")
public class ExamSessionController {

    private final ExamSessionService examSessionService;

    @Autowired
    public ExamSessionController(ExamSessionService examSessionService) {
        this.examSessionService = examSessionService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ExamSession>> getExamSessionsByUserId(@PathVariable Integer userId) {
        List<ExamSession> examSessions = examSessionService.getExamSessionsByUserId(userId);
        return ResponseEntity.ok(examSessions);
    }

    @PostMapping
    public ResponseEntity<ExamSession> submitExamSession(@RequestBody ExamSession examSession) {
        ExamSession createdExamSession = examSessionService.saveExamSession(examSession);
        return ResponseEntity.ok(createdExamSession);
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<ExamSession> getExamSessionById(@PathVariable Integer sessionId) {
        ExamSession examSession = examSessionService.getExamSessionById(sessionId);
        return ResponseEntity.ok(examSession);
    }

    @GetMapping
    public ResponseEntity<List<ExamSession>> getAllExamSessions() {
        List<ExamSession> examSessions = examSessionService.getAllExamSessions();
        return ResponseEntity.ok(examSessions);
    }

    @PutMapping("/{sessionId}")
    public ResponseEntity<ExamSession> updateExamSession(@PathVariable Integer sessionId, @RequestBody ExamSession examSessionDetails) {
        ExamSession updatedExamSession = examSessionService.updateExamSession(sessionId, examSessionDetails);
        return ResponseEntity.ok(updatedExamSession);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{sessionId}")
    public ResponseEntity<Void> deleteExamSession(@PathVariable Integer sessionId) {
        examSessionService.deleteExamSession(sessionId);
        return ResponseEntity.noContent().build();
    }
}

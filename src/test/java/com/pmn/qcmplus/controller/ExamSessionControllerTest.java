package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.service.ExamSessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.Time;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class ExamSessionControllerTest {

    @Mock
    private ExamSessionService examSessionService;

    @InjectMocks
    private ExamSessionController examSessionController;

    private ExamSession examSession1;
    private ExamSession examSession2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        User user = new User(); // Assume User class exists
        Quiz quiz = new Quiz(); // Assume Quiz class exists

        examSession1 = new ExamSession(null, user, quiz, 85, new Time(3600000));
        examSession2 = new ExamSession(null, user, quiz, 90, new Time(4000000));
    }

    @Test
    void testSubmitExamSession() {
        when(examSessionService.saveExamSession(any(ExamSession.class))).thenReturn(examSession1);

        ResponseEntity<ExamSession> response = examSessionController.submitExamSession(examSession1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(85, response.getBody().getScore());
        verify(examSessionService, times(1)).saveExamSession(any(ExamSession.class));
    }

    @Test
    void testGetExamSessionById_Found() {
        when(examSessionService.getExamSessionById(eq(1))).thenReturn(examSession1);

        ResponseEntity<ExamSession> response = examSessionController.getExamSessionById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(85, response.getBody().getScore());
        verify(examSessionService, times(1)).getExamSessionById(eq(1));
    }

    @Test
    void testGetAllExamSessions() {
        when(examSessionService.getAllExamSessions()).thenReturn(Arrays.asList(examSession1, examSession2));

        ResponseEntity<List<ExamSession>> response = examSessionController.getAllExamSessions();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        verify(examSessionService, times(1)).getAllExamSessions();
    }

    @Test
    void testUpdateExamSession() {
        when(examSessionService.updateExamSession(eq(1), any(ExamSession.class))).thenReturn(examSession1);

        ResponseEntity<ExamSession> response = examSessionController.updateExamSession(1, examSession1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(85, response.getBody().getScore());
        verify(examSessionService, times(1)).updateExamSession(eq(1), any(ExamSession.class));
    }

    @Test
    void testDeleteExamSession() {
        doNothing().when(examSessionService).deleteExamSession(eq(1));

        ResponseEntity<Void> response = examSessionController.deleteExamSession(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(examSessionService, times(1)).deleteExamSession(eq(1));
    }
}

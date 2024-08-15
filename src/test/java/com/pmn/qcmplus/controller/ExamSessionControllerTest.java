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

import java.sql.Time;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ExamSessionControllerTest {

    @Mock
    private ExamSessionService examSessionService;

    @InjectMocks
    private ExamSessionController examSessionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSubmitExamSession() {
        // Arrange
        User user = new User();
        user.setId(1);

        Quiz quiz = new Quiz();
        quiz.setQuizId(1);

        ExamSession examSession = new ExamSession(1, user, quiz, 85, new Time(System.currentTimeMillis()));
        when(examSessionService.saveExamSession(any(ExamSession.class))).thenReturn(examSession);

        // Act
        ExamSession response = examSessionController.submitExamSession(examSession);

        // Assert
        assertEquals(examSession, response);
        verify(examSessionService, times(1)).saveExamSession(examSession);
    }
}

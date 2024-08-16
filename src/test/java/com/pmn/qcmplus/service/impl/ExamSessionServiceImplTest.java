package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.repository.ExamSessionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExamSessionServiceImplTest {

    @Mock
    private ExamSessionRepository examSessionRepository;

    @InjectMocks
    private ExamSessionServiceImpl examSessionService;

    private ExamSession examSession1;
    private ExamSession examSession2;

    @BeforeEach
    void setUp() {
        User user = new User(); // Assume User class exists
        Quiz quiz = new Quiz(); // Assume Quiz class exists

        examSession1 = new ExamSession(null, user, quiz, 85, new Time(3600000));
        examSession2 = new ExamSession(null, user, quiz, 90, new Time(4000000));
    }

    @Test
    void testSaveExamSession() {
        when(examSessionRepository.save(any(ExamSession.class))).thenReturn(examSession1);

        ExamSession savedExamSession = examSessionService.saveExamSession(examSession1);

        assertNotNull(savedExamSession);
        assertEquals(85, savedExamSession.getScore());
        verify(examSessionRepository, times(1)).save(any(ExamSession.class));
    }

    @Test
    void testGetExamSessionById_Found() {
        when(examSessionRepository.findById(eq(1))).thenReturn(Optional.of(examSession1));

        ExamSession foundExamSession = examSessionService.getExamSessionById(1);

        assertNotNull(foundExamSession);
        assertEquals(85, foundExamSession.getScore());
        verify(examSessionRepository, times(1)).findById(1);
    }

    @Test
    void testGetExamSessionById_NotFound() {
        when(examSessionRepository.findById(eq(1))).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> examSessionService.getExamSessionById(1));
        verify(examSessionRepository, times(1)).findById(1);
    }

    @Test
    void testGetAllExamSessions() {
        when(examSessionRepository.findAll()).thenReturn(List.of(examSession1, examSession2));

        List<ExamSession> examSessions = examSessionService.getAllExamSessions();

        assertEquals(2, examSessions.size());
        verify(examSessionRepository, times(1)).findAll();
    }

    @Test
    void testUpdateExamSession() {
        when(examSessionRepository.findById(eq(1))).thenReturn(Optional.of(examSession1));
        when(examSessionRepository.save(any(ExamSession.class))).thenReturn(examSession1);

        ExamSession updatedExamSession = examSessionService.updateExamSession(1, examSession1);

        assertNotNull(updatedExamSession);
        assertEquals(85, updatedExamSession.getScore());
        verify(examSessionRepository, times(1)).findById(eq(1));
        verify(examSessionRepository, times(1)).save(any(ExamSession.class));
    }

    @Test
    void testDeleteExamSession() {
        when(examSessionRepository.findById(eq(1))).thenReturn(Optional.of(examSession1));

        examSessionService.deleteExamSession(1);

        verify(examSessionRepository, times(1)).findById(eq(1));
        verify(examSessionRepository, times(1)).delete(any(ExamSession.class));
    }
}

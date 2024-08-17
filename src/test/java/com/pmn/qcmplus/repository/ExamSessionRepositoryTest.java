package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.exception.ExamSessionNotFoundException;
import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.service.impl.ExamSessionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Time;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExamSessionRepositoryTest {

    @Mock
    private ExamSessionRepository examSessionRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private ExamSessionServiceImpl examSessionService;

    private User user;
    private Quiz quiz;
    private ExamSession examSession1;
    private ExamSession examSession2;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setEmail("user@example.com");
        user.setPassword("password");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setGender("Male");
        user.setIsActive(true);

        quiz = new Quiz();
        quiz.setTitle("Sample Quiz");
        quiz.setDescription("This is a sample quiz");

        examSession1 = new ExamSession(1, user, quiz, 85, new Time(3600000));
        examSession2 = new ExamSession(2, user, quiz, 90, new Time(4000000));
    }

    @Test
    void testFindAll() {
        when(examSessionRepository.findAll()).thenReturn(Arrays.asList(examSession1, examSession2));

        List<ExamSession> examSessions = examSessionService.getAllExamSessions();

        assertEquals(2, examSessions.size());
        verify(examSessionRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {
        when(examSessionRepository.findById(examSession1.getSessionId())).thenReturn(Optional.of(examSession1));

        ExamSession foundExamSession = examSessionService.getExamSessionById(examSession1.getSessionId());

        assertTrue(foundExamSession != null);
        assertEquals(85, foundExamSession.getScore());
        verify(examSessionRepository, times(1)).findById(examSession1.getSessionId());
    }

    @Test
    void testSave() {
        when(examSessionRepository.save(any(ExamSession.class))).thenReturn(examSession1);

        ExamSession savedExamSession = examSessionService.saveExamSession(examSession1);

        assertNotNull(savedExamSession);
        assertEquals(85, savedExamSession.getScore());
        verify(examSessionRepository, times(1)).save(examSession1);
    }

    @Test
    void testDeleteById() {
        when(examSessionRepository.findById(examSession1.getSessionId())).thenReturn(Optional.of(examSession1));

        examSessionService.deleteExamSession(examSession1.getSessionId());

        // Change this to verify the delete method
        verify(examSessionRepository, times(1)).delete(examSession1);
    }


    @Test
    void testDeleteById_NotFound() {
        when(examSessionRepository.findById(examSession1.getSessionId())).thenReturn(Optional.empty());

        Exception exception = assertThrows(ExamSessionNotFoundException.class, () -> {
            examSessionService.deleteExamSession(examSession1.getSessionId());
        });

        assertEquals("ExamSession not found with id: 1", exception.getMessage());
        verify(examSessionRepository, times(1)).findById(examSession1.getSessionId());
        verify(examSessionRepository, times(0)).deleteById(examSession1.getSessionId());
    }
}

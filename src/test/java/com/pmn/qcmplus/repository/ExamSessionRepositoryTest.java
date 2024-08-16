package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class ExamSessionRepositoryTest {

    @Autowired
    private ExamSessionRepository examSessionRepository;

    private ExamSession examSession1;
    private ExamSession examSession2;

    @BeforeEach
    void setUp() {
        User user = new User(); // Assume User class exists
        Quiz quiz = new Quiz(); // Assume Quiz class exists

        examSession1 = new ExamSession(null, user, quiz, 85, new Time(3600000));
        examSession2 = new ExamSession(null, user, quiz, 90, new Time(4000000));

        examSessionRepository.save(examSession1);
        examSessionRepository.save(examSession2);
    }

    @Test
    void testFindAll() {
        List<ExamSession> examSessions = examSessionRepository.findAll();
        assertEquals(2, examSessions.size());
    }

    @Test
    void testFindById() {
        Optional<ExamSession> foundExamSession = examSessionRepository.findById(examSession1.getSessionId());
        assertTrue(foundExamSession.isPresent());
        assertEquals(85, foundExamSession.get().getScore());
    }

    @Test
    void testSave() {
        User user = new User();
        Quiz quiz = new Quiz();
        ExamSession newExamSession = new ExamSession(null, user, quiz, 100, new Time(5000000));
        ExamSession savedExamSession = examSessionRepository.save(newExamSession);

        assertNotNull(savedExamSession.getSessionId());
        assertEquals(100, savedExamSession.getScore());
    }

    @Test
    void testDeleteById() {
        examSessionRepository.deleteById(examSession1.getSessionId());
        Optional<ExamSession> foundExamSession = examSessionRepository.findById(examSession1.getSessionId());
        assertFalse(foundExamSession.isPresent());
    }
}

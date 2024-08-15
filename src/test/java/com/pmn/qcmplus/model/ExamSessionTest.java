package com.pmn.qcmplus.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Time;

import static org.junit.jupiter.api.Assertions.*;

class ExamSessionTest {

    private ExamSession examSession;
    private User user;
    private Quiz quiz;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1);
        user.setFirstName("John");
        user.setLastName("Doe");

        quiz = new Quiz();
        quiz.setQuizId(1);
        quiz.setTitle("Sample Quiz");

        examSession = new ExamSession();
        examSession.setSessionId(1);
        examSession.setUser(user);
        examSession.setQuiz(quiz);
        examSession.setScore(85);
        examSession.setTimeSpent(new Time(3600000)); // 1 hour
    }

    @Test
    void testExamSessionGetters() {
        assertEquals(1, examSession.getSessionId());
        assertEquals(user, examSession.getUser());
        assertEquals(quiz, examSession.getQuiz());
        assertEquals(85, examSession.getScore());
        assertEquals(new Time(3600000), examSession.getTimeSpent());
    }

    @Test
    void testExamSessionSetters() {
        User newUser = new User();
        newUser.setId(2);
        newUser.setFirstName("Jane");
        newUser.setLastName("Doe");

        Quiz newQuiz = new Quiz();
        newQuiz.setQuizId(2);
        newQuiz.setTitle("Updated Quiz");

        examSession.setSessionId(2);
        examSession.setUser(newUser);
        examSession.setQuiz(newQuiz);
        examSession.setScore(90);
        examSession.setTimeSpent(new Time(5400000)); // 1 hour 30 minutes

        assertEquals(2, examSession.getSessionId());
        assertEquals(newUser, examSession.getUser());
        assertEquals(newQuiz, examSession.getQuiz());
        assertEquals(90, examSession.getScore());
        assertEquals(new Time(5400000), examSession.getTimeSpent());
    }

    @Test
    void testNoArgsConstructor() {
        ExamSession session = new ExamSession();
        assertEquals(0, session.getSessionId());
        assertNull(session.getUser());
        assertNull(session.getQuiz());
        assertEquals(0, session.getScore());
        assertNull(session.getTimeSpent());
    }
}

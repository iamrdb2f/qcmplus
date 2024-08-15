package com.pmn.qcmplus.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserAnswerTest {

    private UserAnswer userAnswer;
    private ExamSession session;
    private Answer answer;

    @BeforeEach
    void setUp() {
        session = new ExamSession();
        session.setSessionId(1);

        answer = new Answer();
        answer.setAnswerId(1);
        answer.setAnswerText("React");
        answer.setCorrect(true);

        userAnswer = new UserAnswer();
        userAnswer.setId(1);
        userAnswer.setSession(session);
        userAnswer.setAnswer(answer);
    }

    @Test
    void testUserAnswerGetters() {
        assertEquals(1, userAnswer.getId());
        assertEquals(session, userAnswer.getSession());
        assertEquals(answer, userAnswer.getAnswer());
    }

    @Test
    void testUserAnswerSetters() {
        ExamSession newSession = new ExamSession();
        newSession.setSessionId(2);

        Answer newAnswer = new Answer();
        newAnswer.setAnswerId(2);
        newAnswer.setAnswerText("java");
        newAnswer.setCorrect(false);

        userAnswer.setId(2);
        userAnswer.setSession(newSession);
        userAnswer.setAnswer(newAnswer);

        assertEquals(2, userAnswer.getId());
        assertEquals(newSession, userAnswer.getSession());
        assertEquals(newAnswer, userAnswer.getAnswer());
    }

    @Test
    void testNoArgsConstructor() {
        UserAnswer userAnswer = new UserAnswer();
        assertEquals(0, userAnswer.getId());
        assertNull(userAnswer.getSession());
        assertNull(userAnswer.getAnswer());
    }
}

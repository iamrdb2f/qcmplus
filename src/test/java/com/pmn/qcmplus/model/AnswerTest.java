package com.pmn.qcmplus.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AnswerTest {

    private Answer answer;
    private Question question;

    @BeforeEach
    void setUp() {
        question = new Question();
        question.setQuestionId(1);
        question.setQuestionText("What is the capital of France?");

        answer = new Answer();
        answer.setAnswerId(1);
        answer.setQuestion(question);
        answer.setAnswerText("Paris");
        answer.setCorrect(true);
    }

    @Test
    void testAnswerGetters() {
        assertEquals(1, answer.getAnswerId());
        assertEquals(question, answer.getQuestion());
        assertEquals("Paris", answer.getAnswerText());
        assertTrue(answer.isCorrect());
    }

    @Test
    void testAnswerSetters() {
        Question newQuestion = new Question();
        newQuestion.setQuestionId(2);
        newQuestion.setQuestionText("What is the capital of Germany?");

        answer.setAnswerId(2);
        answer.setQuestion(newQuestion);
        answer.setAnswerText("Berlin");
        answer.setCorrect(false);

        assertEquals(2, answer.getAnswerId());
        assertEquals(newQuestion, answer.getQuestion());
        assertEquals("Berlin", answer.getAnswerText());
        assertFalse(answer.isCorrect());
    }

    @Test
    void testNoArgsConstructor() {
        Answer answer = new Answer();
        assertEquals(0, answer.getAnswerId());
        assertNull(answer.getQuestion());
        assertNull(answer.getAnswerText());
        assertFalse(answer.isCorrect());
    }
}

package com.pmn.qcmplus.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class QuizTest {

    private Quiz quiz;

    @BeforeEach
    void setUp() {
        quiz = new Quiz();
        quiz.setQuizId(1);
        quiz.setTitle("Sample Quiz");
        quiz.setDescription("This is a sample quiz description.");
    }

    @Test
    void testQuizGetters() {
        assertEquals(1, quiz.getQuizId());
        assertEquals("Sample Quiz", quiz.getTitle());
        assertEquals("This is a sample quiz description.", quiz.getDescription());
    }

    @Test
    void testQuizSetters() {
        quiz.setQuizId(2);
        assertEquals(2, quiz.getQuizId());

        quiz.setTitle("Updated Quiz");
        assertEquals("Updated Quiz", quiz.getTitle());

        quiz.setDescription("Updated description for the quiz.");
        assertEquals("Updated description for the quiz.", quiz.getDescription());
    }

    @Test
    void testNoArgsConstructor() {
        Quiz quiz = new Quiz();
        assertNull(quiz.getQuizId()); // Expecting null because the quizId is an Integer object and defaults to null
        assertNull(quiz.getTitle());
        assertNull(quiz.getDescription());
    }


    @Test
    void testAllArgsConstructor() {
        Quiz quiz = new Quiz();
        quiz.setQuizId(3);
        quiz.setTitle("Final Quiz");
        quiz.setDescription("This is the final quiz description.");

        assertEquals(3, quiz.getQuizId());
        assertEquals("Final Quiz", quiz.getTitle());
        assertEquals("This is the final quiz description.", quiz.getDescription());
    }
}

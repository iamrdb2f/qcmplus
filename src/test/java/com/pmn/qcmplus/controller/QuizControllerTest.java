package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.service.QuizService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class QuizControllerTest {

    @Mock
    private QuizService quizService;

    @InjectMocks
    private QuizController quizController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllQuizzes() {
        List<Quiz> quizzes = Arrays.asList(
                new Quiz(1, "Bases de données", "Testez vos connaissances sur les SQL et les bases de données."),
                new Quiz(2, "Programmation", "Évaluation des compétences en programmation en divers langages.")
        );
        when(quizService.getAllQuizzes()).thenReturn(quizzes);

        List<Quiz> response = quizController.getAllQuizzes();

        assertEquals(2, response.size());
        assertEquals(quizzes, response);
        verify(quizService, times(1)).getAllQuizzes();
    }

    @Test
    void testGetQuizById_Found() {

        Quiz quiz = new Quiz(1, "Bases de données", "Testez vos connaissances sur les SQL et les bases de données.");
        when(quizService.getQuizById(1)).thenReturn(quiz);

        Quiz response = quizController.getQuizById(1);

        assertEquals(quiz, response);
        verify(quizService, times(1)).getQuizById(1);
    }

    @Test
    void testGetQuizById_NotFound() {

        when(quizService.getQuizById(1)).thenReturn(null);

        Quiz response = quizController.getQuizById(1);

        assertNull(response);
        verify(quizService, times(1)).getQuizById(1);
    }
}

package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.service.QuizService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
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
        // Arrange
        List<Quiz> quizzes = Arrays.asList(
                new Quiz(1, "Quiz 1", "Description 1"),
                new Quiz(2, "Quiz 2", "Description 2")
        );
        when(quizService.getAllQuizzes()).thenReturn(quizzes);

        // Act
        List<Quiz> result = quizController.getAllQuizzes();

        // Assert
        assertEquals(2, result.size());
        verify(quizService, times(1)).getAllQuizzes();
    }

    @Test
    void testGetQuizById_Found() {
        // Arrange
        Quiz quiz = new Quiz(1, "Quiz 1", "Description 1");
        when(quizService.getQuizById(1)).thenReturn(quiz);

        // Act
        Quiz result = quizController.getQuizById(1);

        // Assert
        assertEquals("Quiz 1", result.getTitle());
        verify(quizService, times(1)).getQuizById(1);
    }

    @Test
    void testCreateQuiz() {
        // Arrange
        Quiz quiz = new Quiz(1, "Quiz 1", "Description 1");

        // Mock
        when(quizService.createQuiz(any(Quiz.class))).thenReturn(quiz);

        // Act
        ResponseEntity<Quiz> response = quizController.createQuiz(quiz);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Quiz 1", response.getBody().getTitle());
        verify(quizService, times(1)).createQuiz(any(Quiz.class));
    }


    @Test
    void testUpdateQuiz() {
        // Arrange
        Quiz quizDetails = new Quiz(1, "Updated Quiz", "Updated Description");
        when(quizService.updateQuiz(eq(1), any(Quiz.class))).thenReturn(quizDetails);

        // Act
        ResponseEntity<Quiz> response = quizController.updateQuiz(1, quizDetails);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Updated Quiz", response.getBody().getTitle());
        verify(quizService, times(1)).updateQuiz(eq(1), any(Quiz.class));
    }

    @Test
    void testDeleteQuiz() {
        // Arrange
        doNothing().when(quizService).deleteQuiz(1);

        // Act
        ResponseEntity<Void> response = quizController.deleteQuiz(1);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(quizService, times(1)).deleteQuiz(1);
    }
}

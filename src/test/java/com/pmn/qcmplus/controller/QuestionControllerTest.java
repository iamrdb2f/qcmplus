package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.service.QuestionService;
import com.pmn.qcmplus.service.QuizService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class QuestionControllerTest {

    @Mock
    private QuestionService questionService;

    @Mock
    private QuizService quizService;

    @InjectMocks
    private QuestionController questionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetQuestionsByQuizId() {
        // Arrange
        Quiz quiz = new Quiz();
        quiz.setQuizId(1);

        List<Question> questions = Arrays.asList(
                new Question(1, quiz, "Quel est le port standard pour SQL Server?"),
                new Question(2, quiz, "Que signifie l’acronyme JSON?")
        );
        when(questionService.getQuestionsByQuizId(1)).thenReturn(questions);

        // Act
        List<Question> response = questionController.getQuestionsByQuizId(1);

        // Assert
        assertEquals(2, response.size());
        assertEquals(questions, response);
        verify(questionService, times(1)).getQuestionsByQuizId(1);
    }

    @Test
    void testCreateQuestion() {
        // Arrange
        Quiz quiz = new Quiz();
        quiz.setQuizId(1);
        Question question = new Question(1, quiz, "Quel est le port standard pour SQL Server?");

        when(quizService.getQuizById(1)).thenReturn(quiz);
        when(questionService.saveQuestion(any(Question.class))).thenReturn(question);

        // Act
        Question response = questionController.createQuestion(question, 1);

        // Assert
        assertEquals(question, response);
        verify(quizService, times(1)).getQuizById(1);
        verify(questionService, times(1)).saveQuestion(question);
    }

    @Test
    void testDeleteQuestion() {
        // Act
        questionController.deleteQuestion(1, "1");

        // Assert
        verify(questionService, times(1)).deleteQuestion(1);
    }
}

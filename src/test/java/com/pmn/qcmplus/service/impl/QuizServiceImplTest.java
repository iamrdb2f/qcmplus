package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.exception.QuizNotFoundException;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.repository.QuizRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuizServiceImplTest {

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private QuizServiceImpl quizService;

    @Test
    void testGetAllQuizzes() {
        Quiz quiz1 = new Quiz(1, "Quiz 1", "Description 1");
        Quiz quiz2 = new Quiz(2, "Quiz 2", "Description 2");

        when(quizRepository.findAll()).thenReturn(List.of(quiz1, quiz2));

        List<Quiz> quizzes = quizService.getAllQuizzes();
        assertEquals(2, quizzes.size());
        verify(quizRepository, times(1)).findAll();
    }

    @Test
    void testGetQuizById_Found() {
        Quiz quiz = new Quiz(1, "Quiz 1", "Description 1");

        when(quizRepository.findById(1)).thenReturn(Optional.of(quiz));

        Quiz foundQuiz = quizService.getQuizById(1);
        assertNotNull(foundQuiz);
        assertEquals("Quiz 1", foundQuiz.getTitle());
    }

    @Test
    void testGetQuizById_NotFound() {
        when(quizRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(QuizNotFoundException.class, () -> quizService.getQuizById(1));
    }

    @Test
    void testCreateQuiz() {
        Quiz quiz = new Quiz(1, "Quiz 1", "Description 1");

        when(quizRepository.save(any(Quiz.class))).thenReturn(new Quiz(1, "Quiz 1", "Description 1"));

        Quiz createdQuiz = quizService.createQuiz(quiz);
        assertNotNull(createdQuiz.getQuizId());
        assertEquals("Quiz 1", createdQuiz.getTitle());
    }

    @Test
    void testUpdateQuiz() {
        Quiz existingQuiz = new Quiz(1, "Quiz 1", "Description 1");
        Quiz updatedQuiz = new Quiz(1, "Updated Quiz", "Updated Description");

        when(quizRepository.findById(1)).thenReturn(Optional.of(existingQuiz));
        when(quizRepository.save(any(Quiz.class))).thenReturn(updatedQuiz);

        Quiz result = quizService.updateQuiz(1, updatedQuiz);
        assertEquals("Updated Quiz", result.getTitle());
        assertEquals("Updated Description", result.getDescription());
    }

    @Test
    void testDeleteQuiz() {
        Quiz quiz = new Quiz(1, "Quiz 1", "Description 1");

        when(quizRepository.findById(1)).thenReturn(Optional.of(quiz));
        doNothing().when(quizRepository).delete(quiz);

        quizService.deleteQuiz(1);
        verify(quizRepository, times(1)).delete(quiz);
    }
}

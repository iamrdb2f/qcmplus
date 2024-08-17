package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.exception.QuizNotFoundException;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.service.impl.QuizServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuizRepositoryTest {

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private QuizServiceImpl quizService;

    private Quiz quiz1;
    private Quiz quiz2;

    @BeforeEach
    void setUp() {
        quiz1 = new Quiz(1, "Quiz 1", "Description 1");
        quiz2 = new Quiz(2, "Quiz 2", "Description 2");

        // Mocking behavior for repository methods
        lenient().when(quizRepository.save(any(Quiz.class))).thenAnswer(invocation -> {
            Quiz quiz = invocation.getArgument(0);
            if (quiz.getQuizId() == null) {
                quiz.setQuizId((int) (Math.random() * 100)); // Simulate ID assignment
            }
            return quiz;
        });

        lenient().when(quizRepository.findById(quiz1.getQuizId())).thenReturn(Optional.of(quiz1));
        lenient().when(quizRepository.findAll()).thenReturn(Arrays.asList(quiz1, quiz2));
    }

    @Test
    void testFindAll() {
        List<Quiz> quizzes = quizService.getAllQuizzes();

        assertEquals(2, quizzes.size());
        assertTrue(quizzes.contains(quiz1));
        assertTrue(quizzes.contains(quiz2));

        verify(quizRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {
        Optional<Quiz> foundQuiz = Optional.ofNullable(quizService.getQuizById(quiz1.getQuizId()));

        assertTrue(foundQuiz.isPresent());
        assertEquals("Quiz 1", foundQuiz.get().getTitle());

        verify(quizRepository, times(1)).findById(quiz1.getQuizId());
    }

    @Test
    void testSave() {
        Quiz newQuiz = new Quiz(null, "Quiz 3", "Description 3");  // Changed to Integer
        when(quizRepository.save(any(Quiz.class))).thenReturn(newQuiz);

        Quiz savedQuiz = quizService.createQuiz(newQuiz);

        assertEquals("Quiz 3", savedQuiz.getTitle());

        verify(quizRepository, times(1)).save(any(Quiz.class));
    }

    @Test
    void testDeleteById() {

        when(quizRepository.findById(quiz1.getQuizId())).thenReturn(Optional.of(quiz1));
        quizService.deleteQuiz(quiz1.getQuizId());
        verify(quizRepository, times(1)).delete(quiz1);
        when(quizRepository.findById(quiz1.getQuizId())).thenReturn(Optional.empty());

        assertThrows(QuizNotFoundException.class, () -> {
            quizService.getQuizById(quiz1.getQuizId());
        });
    }
}
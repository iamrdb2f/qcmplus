package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Quiz;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class QuizRepositoryTest {

    @Autowired
    private QuizRepository quizRepository;

    private Quiz quiz1;
    private Quiz quiz2;

    @BeforeEach
    void setUp() {
        quiz1 = new Quiz(null, "Quiz 1", "Description 1");
        quiz2 = new Quiz(null, "Quiz 2", "Description 2");
        quizRepository.save(quiz1);
        quizRepository.save(quiz2);
    }

    @Test
    void testFindAll() {
        List<Quiz> quizzes = quizRepository.findAll();
        assertEquals(2, quizzes.size());
        assertTrue(quizzes.contains(quiz1));
        assertTrue(quizzes.contains(quiz2));
    }

    @Test
    void testFindById() {
        Optional<Quiz> foundQuiz = quizRepository.findById(quiz1.getQuizId());
        assertTrue(foundQuiz.isPresent());
        assertEquals("Quiz 1", foundQuiz.get().getTitle());
    }

    @Test
    void testSave() {
        Quiz newQuiz = new Quiz(null, "Quiz 3", "Description 3");
        Quiz savedQuiz = quizRepository.save(newQuiz);

        assertNotNull(savedQuiz.getQuizId());
        assertEquals("Quiz 3", savedQuiz.getTitle());
    }

    @Test
    void testDeleteById() {
        quizRepository.deleteById(quiz1.getQuizId());
        Optional<Quiz> foundQuiz = quizRepository.findById(quiz1.getQuizId());
        assertFalse(foundQuiz.isPresent());
    }
}

package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.model.UserAnswer;
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
class UserAnswerRepositoryTest {

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    private UserAnswer userAnswer1;
    private UserAnswer userAnswer2;

    @BeforeEach
    void setUp() {
        ExamSession session = new ExamSession(); // Assume ExamSession class exists
        Answer answer = new Answer(); // Assume Answer class exists

        userAnswer1 = new UserAnswer(null, session, answer);
        userAnswer2 = new UserAnswer(null, session, answer);

        userAnswerRepository.save(userAnswer1);
        userAnswerRepository.save(userAnswer2);
    }

    @Test
    void testFindAll() {
        List<UserAnswer> userAnswers = userAnswerRepository.findAll();
        assertEquals(2, userAnswers.size());
        assertTrue(userAnswers.contains(userAnswer1));
        assertTrue(userAnswers.contains(userAnswer2));
    }

    @Test
    void testFindById() {
        Optional<UserAnswer> foundUserAnswer = userAnswerRepository.findById(userAnswer1.getId());
        assertTrue(foundUserAnswer.isPresent());
        assertEquals(userAnswer1.getId(), foundUserAnswer.get().getId());
    }

    @Test
    void testSave() {
        ExamSession session = new ExamSession(); // Assume ExamSession class exists
        Answer answer = new Answer(); // Assume Answer class exists
        UserAnswer newUserAnswer = new UserAnswer(null, session, answer);
        UserAnswer savedUserAnswer = userAnswerRepository.save(newUserAnswer);

        assertNotNull(savedUserAnswer.getId());
        assertEquals(newUserAnswer.getSession(), savedUserAnswer.getSession());
        assertEquals(newUserAnswer.getAnswer(), savedUserAnswer.getAnswer());
    }

    @Test
    void testDeleteById() {
        userAnswerRepository.deleteById(userAnswer1.getId());
        Optional<UserAnswer> foundUserAnswer = userAnswerRepository.findById(userAnswer1.getId());
        assertFalse(foundUserAnswer.isPresent());
    }
}

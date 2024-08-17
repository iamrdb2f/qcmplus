package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.model.UserAnswer;
import com.pmn.qcmplus.service.impl.UserAnswerServiceImpl;
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
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserAnswerRepositoryTest {

    @Mock
    private UserAnswerRepository userAnswerRepository;

    @InjectMocks
    private UserAnswerServiceImpl userAnswerService;

    private UserAnswer userAnswer1;
    private UserAnswer userAnswer2;

    @BeforeEach
    void setUp() {
        ExamSession session = new ExamSession();
        Answer answer = new Answer();

        userAnswer1 = new UserAnswer(1, session, answer);
        userAnswer2 = new UserAnswer(2, session, answer);

    }

    @Test
    void testFindAll() {

        when(userAnswerRepository.findAll()).thenReturn(Arrays.asList(userAnswer1, userAnswer2));

        List<UserAnswer> userAnswers = userAnswerService.getAllUserAnswers();


        assertEquals(2, userAnswers.size(), "The size of the returned user answers list should be 2.");
        assertTrue(userAnswers.contains(userAnswer1), "The list should contain userAnswer1.");
        assertTrue(userAnswers.contains(userAnswer2), "The list should contain userAnswer2.");

        verify(userAnswerRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {

        when(userAnswerRepository.findById(userAnswer1.getId())).thenReturn(Optional.of(userAnswer1));

        UserAnswer foundUserAnswer = userAnswerService.getUserAnswerById(userAnswer1.getId());
        assertNotNull(foundUserAnswer);
        assertEquals(userAnswer1.getId(), foundUserAnswer.getId());

        verify(userAnswerRepository, times(1)).findById(userAnswer1.getId());
    }

    @Test
    void testSave() {
        ExamSession session = new ExamSession();
        Answer answer = new Answer();
        UserAnswer newUserAnswer = new UserAnswer(3, session, answer);

        when(userAnswerRepository.save(any(UserAnswer.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserAnswer savedUserAnswer = userAnswerService.saveUserAnswer(newUserAnswer);

        assertEquals(newUserAnswer.getSession(), savedUserAnswer.getSession());
        assertEquals(newUserAnswer.getAnswer(), savedUserAnswer.getAnswer());

        verify(userAnswerRepository, times(1)).save(newUserAnswer);
    }

    @Test
    void testDeleteById() {

        when(userAnswerRepository.findById(userAnswer1.getId())).thenReturn(Optional.of(userAnswer1));


        userAnswerService.deleteUserAnswer(userAnswer1.getId());
        verify(userAnswerRepository, times(1)).delete(userAnswer1);

        when(userAnswerRepository.findById(userAnswer1.getId())).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> userAnswerService.getUserAnswerById(userAnswer1.getId()));
    }
}
package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.model.UserAnswer;
import com.pmn.qcmplus.repository.UserAnswerRepository;
import org.junit.jupiter.api.BeforeEach;
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
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserAnswerServiceImplTest {

    @Mock
    private UserAnswerRepository userAnswerRepository;

    @InjectMocks
    private UserAnswerServiceImpl userAnswerService;

    private UserAnswer userAnswer1;
    private UserAnswer userAnswer2;

    @BeforeEach
    void setUp() {
        ExamSession session = new ExamSession(); // Assume ExamSession class exists
        Answer answer = new Answer(); // Assume Answer class exists

        userAnswer1 = new UserAnswer(1, session, answer);
        userAnswer2 = new UserAnswer(2, session, answer);
    }

    @Test
    void testSaveUserAnswer() {
        when(userAnswerRepository.save(any(UserAnswer.class))).thenReturn(userAnswer1);

        UserAnswer savedUserAnswer = userAnswerService.saveUserAnswer(userAnswer1);

        assertNotNull(savedUserAnswer);
        verify(userAnswerRepository, times(1)).save(any(UserAnswer.class));
    }

    @Test
    void testGetUserAnswerById_Found() {
        when(userAnswerRepository.findById(eq(1))).thenReturn(Optional.of(userAnswer1));

        UserAnswer foundUserAnswer = userAnswerService.getUserAnswerById(1);

        assertNotNull(foundUserAnswer);
        verify(userAnswerRepository, times(1)).findById(1);
    }

    @Test
    void testGetUserAnswerById_NotFound() {
        when(userAnswerRepository.findById(eq(1))).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> userAnswerService.getUserAnswerById(1));
        verify(userAnswerRepository, times(1)).findById(1);
    }

    @Test
    void testGetAllUserAnswers() {
        when(userAnswerRepository.findAll()).thenReturn(List.of(userAnswer1, userAnswer2));

        List<UserAnswer> userAnswers = userAnswerService.getAllUserAnswers();

        assertEquals(2, userAnswers.size());
        verify(userAnswerRepository, times(1)).findAll();
    }

    @Test
    void testUpdateUserAnswer() {
        when(userAnswerRepository.findById(eq(1))).thenReturn(Optional.of(userAnswer1));
        when(userAnswerRepository.save(any(UserAnswer.class))).thenReturn(userAnswer1);

        UserAnswer updatedUserAnswer = userAnswerService.updateUserAnswer(1, userAnswer1);

        assertNotNull(updatedUserAnswer);
        verify(userAnswerRepository, times(1)).findById(eq(1));
        verify(userAnswerRepository, times(1)).save(any(UserAnswer.class));
    }

    @Test
    void testDeleteUserAnswer() {
        when(userAnswerRepository.findById(eq(1))).thenReturn(Optional.of(userAnswer1));

        userAnswerService.deleteUserAnswer(1);

        verify(userAnswerRepository, times(1)).findById(eq(1));
        verify(userAnswerRepository, times(1)).delete(any(UserAnswer.class));
    }
}

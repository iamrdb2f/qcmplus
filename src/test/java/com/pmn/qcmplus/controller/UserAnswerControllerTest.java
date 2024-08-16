package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.ExamSession;
import com.pmn.qcmplus.model.UserAnswer;
import com.pmn.qcmplus.service.UserAnswerService;
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
import static org.mockito.Mockito.*;

class UserAnswerControllerTest {

    @Mock
    private UserAnswerService userAnswerService;

    @InjectMocks
    private UserAnswerController userAnswerController;

    private UserAnswer userAnswer1;
    private UserAnswer userAnswer2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        ExamSession session = new ExamSession(); // Assume ExamSession class exists
        Answer answer = new Answer(); // Assume Answer class exists

        userAnswer1 = new UserAnswer(null, session, answer);
        userAnswer2 = new UserAnswer(null, session, answer);
    }

    @Test
    void testSubmitUserAnswer() {
        when(userAnswerService.saveUserAnswer(any(UserAnswer.class))).thenReturn(userAnswer1);

        ResponseEntity<UserAnswer> response = userAnswerController.submitUserAnswer(userAnswer1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userAnswerService, times(1)).saveUserAnswer(any(UserAnswer.class));
    }

    @Test
    void testGetUserAnswerById_Found() {
        when(userAnswerService.getUserAnswerById(eq(1))).thenReturn(userAnswer1);

        ResponseEntity<UserAnswer> response = userAnswerController.getUserAnswerById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userAnswerService, times(1)).getUserAnswerById(eq(1));
    }

    @Test
    void testGetAllUserAnswers() {
        when(userAnswerService.getAllUserAnswers()).thenReturn(Arrays.asList(userAnswer1, userAnswer2));

        ResponseEntity<List<UserAnswer>> response = userAnswerController.getAllUserAnswers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        verify(userAnswerService, times(1)).getAllUserAnswers();
    }

    @Test
    void testUpdateUserAnswer() {
        when(userAnswerService.updateUserAnswer(eq(1), any(UserAnswer.class))).thenReturn(userAnswer1);

        ResponseEntity<UserAnswer> response = userAnswerController.updateUserAnswer(1, userAnswer1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userAnswerService, times(1)).updateUserAnswer(eq(1), any(UserAnswer.class));
    }

    @Test
    void testDeleteUserAnswer() {
        doNothing().when(userAnswerService).deleteUserAnswer(eq(1));

        ResponseEntity<Void> response = userAnswerController.deleteUserAnswer(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userAnswerService, times(1)).deleteUserAnswer(eq(1));
    }
}

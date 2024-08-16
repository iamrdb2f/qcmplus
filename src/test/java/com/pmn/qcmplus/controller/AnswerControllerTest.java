package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.service.AnswerService;
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

class AnswerControllerTest {

    @Mock
    private AnswerService answerService;

    @InjectMocks
    private AnswerController answerController;

    private Answer answer;
    private Question question;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        question = new Question(1, null, "Sample question");
        answer = new Answer(1, question, "Sample answer", true);
    }

    @Test
    void testGetAnswersByQuestionId() {
        when(answerService.getAnswersByQuestionId(eq(1))).thenReturn(Arrays.asList(answer));

        ResponseEntity<List<Answer>> response = answerController.getAnswersByQuestionId(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        verify(answerService, times(1)).getAnswersByQuestionId(eq(1));
    }

    @Test
    void testGetAnswerById() {
        when(answerService.getAnswerById(eq(1))).thenReturn(answer);

        ResponseEntity<Answer> response = answerController.getAnswerById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Sample answer", response.getBody().getAnswerText());
        verify(answerService, times(1)).getAnswerById(eq(1));
    }

    @Test
    void testCreateAnswer() {
        when(answerService.saveAnswer(any(Answer.class))).thenReturn(answer);

        ResponseEntity<Answer> response = answerController.createAnswer(answer);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Sample answer", response.getBody().getAnswerText());
        verify(answerService, times(1)).saveAnswer(any(Answer.class));
    }

    @Test
    void testUpdateAnswer() {
        when(answerService.getAnswerById(eq(1))).thenReturn(answer);
        when(answerService.saveAnswer(any(Answer.class))).thenReturn(answer);

        ResponseEntity<Answer> response = answerController.updateAnswer(1, answer);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Sample answer", response.getBody().getAnswerText());
        verify(answerService, times(1)).saveAnswer(any(Answer.class));
    }

    @Test
    void testDeleteAnswer() {
        doNothing().when(answerService).deleteAnswer(eq(1));

        ResponseEntity<Void> response = answerController.deleteAnswer(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(answerService, times(1)).deleteAnswer(eq(1));
    }
}

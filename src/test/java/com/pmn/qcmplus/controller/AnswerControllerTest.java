package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.service.AnswerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AnswerControllerTest {

    @Mock
    private AnswerService answerService;

    @InjectMocks
    private AnswerController answerController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAnswersByQuestionId() {
        Question question = new Question();
        question.setQuestionId(1);

        List<Answer> answers = Arrays.asList(
                new Answer(1, question, "Answer 1", true),
                new Answer(2, question, "Answer 2", false)
        );
        when(answerService.getAnswersByQuestionId(1)).thenReturn(answers);

        List<Answer> response = answerController.getAnswersByQuestionId(1);

        assertEquals(2, response.size());
        assertEquals(answers, response);
        verify(answerService, times(1)).getAnswersByQuestionId(1);
    }

    @Test
    void testGetAnswerById_Found() {
        Question question = new Question();
        question.setQuestionId(1);
        Answer answer = new Answer(1, question, "Answer 1", true);
        when(answerService.getAnswerById(1)).thenReturn(answer);

        Answer response = answerController.getAnswerById(1);

        assertEquals(answer, response);
        verify(answerService, times(1)).getAnswerById(1);
    }

    @Test
    void testGetAnswerById_NotFound() {
        when(answerService.getAnswerById(1)).thenReturn(null);

        Answer response = answerController.getAnswerById(1);

        assertNull(response);
        verify(answerService, times(1)).getAnswerById(1);
    }

    @Test
    void testCreateAnswer() {

        Question question = new Question();
        question.setQuestionId(1);
        Answer answer = new Answer(1, question, "Answer 1", true);
        when(answerService.saveAnswer(any(Answer.class))).thenReturn(answer);

        Answer response = answerController.createAnswer(answer);

        assertEquals(answer, response);
        verify(answerService, times(1)).saveAnswer(answer);
    }

    @Test
    void testUpdateAnswer_Found() {

        Question question = new Question();
        question.setQuestionId(1);
        Answer existingAnswer = new Answer(1, question, "Old Answer", false);
        Answer updatedDetails = new Answer(1, question, "Updated Answer", true);

        when(answerService.getAnswerById(1)).thenReturn(existingAnswer);
        when(answerService.saveAnswer(any(Answer.class))).thenReturn(updatedDetails);

        Answer response = answerController.updateAnswer(1, updatedDetails);

        assertEquals(updatedDetails.getAnswerText(), response.getAnswerText());
        assertEquals(updatedDetails.isCorrect(), response.isCorrect());
        verify(answerService, times(1)).getAnswerById(1);
        verify(answerService, times(1)).saveAnswer(existingAnswer);
    }

    @Test
    void testUpdateAnswer_NotFound() {
        when(answerService.getAnswerById(1)).thenReturn(null);

        Answer response = answerController.updateAnswer(1, new Answer());

        assertNull(response);
        verify(answerService, times(1)).getAnswerById(1);
        verify(answerService, times(0)).saveAnswer(any(Answer.class));
    }

    @Test
    void testDeleteAnswer() {
        answerController.deleteAnswer(1);

        verify(answerService, times(1)).deleteAnswer(1);
    }
}

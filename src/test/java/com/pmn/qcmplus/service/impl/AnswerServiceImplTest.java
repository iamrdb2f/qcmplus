package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.repository.AnswerRepository;
import com.pmn.qcmplus.repository.QuestionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AnswerServiceImplTest {

    @Mock
    private AnswerRepository answerRepository;

    @Mock
    private QuestionRepository questionRepository;

    @InjectMocks
    private AnswerServiceImpl answerService;

    private Answer answer;
    private Question question;

    @BeforeEach
    void setUp() {
        question = new Question(1, null, "Sample question");
        answer = new Answer(1, question, "Sample answer", true);
    }

    @Test
    void testSaveAnswer() {
        when(questionRepository.findById(eq(1))).thenReturn(Optional.of(question));
        when(answerRepository.save(any(Answer.class))).thenReturn(answer);

        Answer savedAnswer = answerService.saveAnswer(answer);

        assertNotNull(savedAnswer);
        assertEquals("Sample answer", savedAnswer.getAnswerText());
        verify(answerRepository, times(1)).save(any(Answer.class));
    }

    @Test
    void testSaveAnswer_QuestionNotFound() {
        when(questionRepository.findById(eq(1))).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            answerService.saveAnswer(answer);
        });

        assertEquals("Question does not exist.", exception.getMessage());
    }

    @Test
    void testGetAnswerById_Found() {
        when(answerRepository.findById(eq(1))).thenReturn(Optional.of(answer));

        Answer foundAnswer = answerService.getAnswerById(1);

        assertNotNull(foundAnswer);
        assertEquals("Sample answer", foundAnswer.getAnswerText());
    }

    @Test
    void testGetAnswerById_NotFound() {
        when(answerRepository.findById(eq(1))).thenReturn(Optional.empty());

        Answer foundAnswer = answerService.getAnswerById(1);

        assertNull(foundAnswer);
    }

    @Test
    void testDeleteAnswer() {
        when(answerRepository.findById(eq(1))).thenReturn(Optional.of(answer));

        answerService.deleteAnswer(1);

        verify(answerRepository, times(1)).deleteById(eq(1));
    }

    @Test
    void testDeleteAnswer_NotFound() {
        when(answerRepository.findById(eq(1))).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            answerService.deleteAnswer(1);
        });

        assertEquals("Answer does not exist.", exception.getMessage());
    }
}

package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.service.impl.AnswerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AnswerRepositoryTest {

    @Mock
    private AnswerRepository answerRepository;

    @Mock
    private QuestionRepository questionRepository;

    @InjectMocks
    private AnswerServiceImpl answerService;

    private Question question;
    private Answer answer1;
    private Answer answer2;

    @BeforeEach
    void setUp() {
        Quiz quiz = new Quiz(2, "Sample Quiz", "Description");
        question = new Question(1, quiz, "Sample question");
        answer1 = new Answer(1, question, "Answer 1", true);
        answer2 = new Answer(2, question, "Answer 2", false);
    }

    @Test
    void testFindAll() {
        when(answerRepository.findAll()).thenReturn(List.of(answer1, answer2));

        List<Answer> answers = answerService.getAllAnswers();
        assertEquals(2, answers.size());

        verify(answerRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {
        when(answerRepository.findById(answer1.getAnswerId())).thenReturn(Optional.of(answer1));

        Optional<Answer> foundAnswer = Optional.ofNullable(answerService.getAnswerById(answer1.getAnswerId()));
        assertTrue(foundAnswer.isPresent());
        assertEquals(answer1.getAnswerText(), foundAnswer.get().getAnswerText());

        verify(answerRepository, times(1)).findById(answer1.getAnswerId());
    }

    @Test
    void testSave() {

        when(questionRepository.findById(question.getQuestionId())).thenReturn(Optional.of(question));
        when(answerRepository.save(any(Answer.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Answer newAnswer = new Answer(3, question, "Answer 3", true);
        Answer savedAnswer = answerService.saveAnswer(newAnswer);

        assertEquals("Answer 3", savedAnswer.getAnswerText());
        verify(answerRepository, times(1)).save(any(Answer.class));


        verify(questionRepository, times(1)).findById(question.getQuestionId());
    }


    @Test
    void testDeleteById() {
        when(answerRepository.findById(answer1.getAnswerId())).thenReturn(Optional.of(answer1));

        answerService.deleteAnswer(answer1.getAnswerId());
        verify(answerRepository, times(1)).deleteById(answer1.getAnswerId());
    }

    @Test
    void testFindByQuestionId() {
        when(answerRepository.findByQuestion_QuestionId(question.getQuestionId())).thenReturn(List.of(answer1, answer2));

        List<Answer> answers = answerService.getAnswersByQuestionId(question.getQuestionId());
        assertEquals(2, answers.size());

        verify(answerRepository, times(1)).findByQuestion_QuestionId(question.getQuestionId());
    }
}
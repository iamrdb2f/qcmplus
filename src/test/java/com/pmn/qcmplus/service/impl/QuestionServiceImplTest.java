package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.exception.QuestionNotFoundException;
import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.repository.QuestionRepository;
import com.pmn.qcmplus.repository.QuizRepository;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

class QuestionServiceImplTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private QuestionServiceImpl questionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetQuestionsByQuizId() {
        int quizId = 1;
        List<Question> mockQuestions = List.of(new Question());
        when(questionRepository.findByQuiz_QuizId(quizId)).thenReturn(mockQuestions);

        List<Question> questions = questionService.getQuestionsByQuizId(quizId);

        assertEquals(mockQuestions, questions);
        verify(questionRepository, times(1)).findByQuiz_QuizId(quizId);
    }

    @Test
    void testGetQuestionById() {
        int questionId = 1;
        Question mockQuestion = new Question();
        when(questionRepository.findById(questionId)).thenReturn(Optional.of(mockQuestion));

        Question question = questionService.getQuestionById(questionId);

        assertEquals(mockQuestion, question);
        verify(questionRepository, times(1)).findById(questionId);
    }

    @Test
    void testGetQuestionByIdThrowsExceptionWhenNotFound() {
        int questionId = 1;
        when(questionRepository.findById(questionId)).thenReturn(Optional.empty());

        assertThrows(QuestionNotFoundException.class, () -> questionService.getQuestionById(questionId));
        verify(questionRepository, times(1)).findById(questionId);
    }

    @Test
    void testSaveQuestion() {
        Quiz mockQuiz = new Quiz();
        mockQuiz.setQuizId(1);
        Question mockQuestion = new Question();
        mockQuestion.setQuiz(mockQuiz);

        when(quizRepository.findById(any(Integer.class))).thenReturn(Optional.of(mockQuiz));
        when(questionRepository.save(any(Question.class))).thenReturn(mockQuestion);

        Question savedQuestion = questionService.saveQuestion(mockQuestion);

        assertEquals(mockQuestion, savedQuestion);
        verify(questionRepository, times(1)).save(mockQuestion);
    }

    @Test
    void testSaveQuestionThrowsExceptionWhenQuizNotFound() {

        Quiz mockQuiz = new Quiz();
        mockQuiz.setQuizId(1);
        Question mockQuestion = new Question();
        mockQuestion.setQuiz(mockQuiz);
        when(quizRepository.findById(any(Integer.class))).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> questionService.saveQuestion(mockQuestion));
        verify(questionRepository, never()).save(any(Question.class));
    }

    @Test
    void testUpdateQuestion() {
        Quiz mockQuiz = new Quiz();
        mockQuiz.setQuizId(1);
        Question mockQuestion = new Question();
        mockQuestion.setQuiz(mockQuiz);
        mockQuestion.setQuestionId(1);

        when(quizRepository.findById(any(Integer.class))).thenReturn(Optional.of(mockQuiz));
        when(questionRepository.findById(any(Integer.class))).thenReturn(Optional.of(mockQuestion));
        when(questionRepository.save(any(Question.class))).thenReturn(mockQuestion);

        Question updatedQuestion = questionService.updateQuestion(mockQuestion);

        assertEquals(mockQuestion, updatedQuestion);
        verify(quizRepository, times(1)).findById(any(Integer.class));
        verify(questionRepository, times(1)).findById(any(Integer.class));
        verify(questionRepository, times(1)).save(any(Question.class));
    }

    @Test
    void testUpdateQuestionThrowsExceptionWhenNotFound() {
        Quiz mockQuiz = new Quiz();
        mockQuiz.setQuizId(1);
        Question mockQuestion = new Question();
        mockQuestion.setQuiz(mockQuiz);
        mockQuestion.setQuestionId(1);

        when(quizRepository.findById(any(Integer.class))).thenReturn(Optional.of(mockQuiz));
        when(questionRepository.findById(any(Integer.class))).thenReturn(Optional.empty());

        assertThrows(QuestionNotFoundException.class, () -> questionService.updateQuestion(mockQuestion));
        verify(quizRepository, times(1)).findById(any(Integer.class));
        verify(questionRepository, times(1)).findById(any(Integer.class));
        verify(questionRepository, never()).save(any(Question.class));
    }


    @Test
    void testDeleteQuestion() {
        int questionId = 1;
        Question mockQuestion = new Question();
        when(questionRepository.findById(questionId)).thenReturn(Optional.of(mockQuestion));

        questionService.deleteQuestion(questionId);

        verify(questionRepository, times(1)).deleteById(questionId);
    }

    @Test
    void testDeleteQuestionThrowsExceptionWhenNotFound() {
        int questionId = 1;
        when(questionRepository.findById(questionId)).thenReturn(Optional.empty());

        assertThrows(QuestionNotFoundException.class, () -> questionService.deleteQuestion(questionId));
        verify(questionRepository, never()).deleteById(questionId);
    }

    @Test
    void testGetAllQuestions() {
        List<Question> mockQuestions = List.of(new Question());
        when(questionRepository.findAll()).thenReturn(mockQuestions);

        List<Question> questions = questionService.getAllQuestions();

        assertEquals(mockQuestions, questions);
        verify(questionRepository, times(1)).findAll();
    }
}

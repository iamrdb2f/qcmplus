package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.exception.QuestionNotFoundException;
import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.service.impl.QuestionServiceImpl;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
public class QuestionRepositoryTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private QuizRepository quizRepository;

    @InjectMocks
    private QuestionServiceImpl questionService;

    private Quiz quiz;
    private Question question;

    @BeforeEach
    void setUp() {
        quiz = new Quiz();
        quiz.setQuizId(1);
        quiz.setTitle("Sample Quiz");
        quiz.setDescription("This is a sample quiz");

        question = new Question();
        question.setQuestionId(1);
        question.setQuestionText("Sample Question");
        question.setQuiz(quiz);
    }

    @Test
    void testGetQuestionsByQuizId() {
        when(questionRepository.findByQuiz_QuizId(1)).thenReturn(List.of(question));

        List<Question> questions = questionService.getQuestionsByQuizId(1);

        assertNotNull(questions);
        assertEquals(1, questions.size());
        assertEquals("Sample Question", questions.get(0).getQuestionText());

        verify(questionRepository, times(1)).findByQuiz_QuizId(1);
    }

    @Test
    void testGetQuestionById() {
        when(questionRepository.findById(1)).thenReturn(Optional.of(question));

        Question foundQuestion = questionService.getQuestionById(1);

        assertNotNull(foundQuestion);
        assertEquals("Sample Question", foundQuestion.getQuestionText());

        verify(questionRepository, times(1)).findById(1);
    }

    @Test
    void testSaveQuestion() {
        when(quizRepository.findById(1)).thenReturn(Optional.of(quiz));
        when(questionRepository.save(any(Question.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Question savedQuestion = questionService.saveQuestion(question);

        assertNotNull(savedQuestion);
        assertEquals("Sample Question", savedQuestion.getQuestionText());

        verify(quizRepository, times(1)).findById(1);
        verify(questionRepository, times(1)).save(any(Question.class));
    }

    @Test
    void testSaveQuestion_QuizNotFound() {
        when(quizRepository.findById(1)).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            questionService.saveQuestion(question);
        });

        assertEquals("Quiz does not exist.", exception.getMessage());

        verify(quizRepository, times(1)).findById(1);
        verify(questionRepository, times(0)).save(any(Question.class));
    }

    @Test
    void testDeleteQuestion() {
        when(questionRepository.findById(1)).thenReturn(Optional.of(question));

        questionService.deleteQuestion(1);

        verify(questionRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteQuestion_NotFound() {
        when(questionRepository.findById(1)).thenReturn(Optional.empty());

        QuestionNotFoundException exception = assertThrows(QuestionNotFoundException.class, () -> {
            questionService.deleteQuestion(1);
        });

        assertEquals("Question with id 1 not found.", exception.getMessage());

        verify(questionRepository, times(1)).findById(1);
        verify(questionRepository, times(0)).deleteById(1);
    }

    @Test
    void testGetQuestionsByText() {
        // Arrange
        String searchText = "sample";
        Question expectedQuestion = new Question();
        expectedQuestion.setQuestionId(1);
        expectedQuestion.setQuestionText("Sample question 1");

        when(questionRepository.findByQuestionTextContainingIgnoreCase(searchText)).thenReturn(expectedQuestion);

        // Act
        Question actualQuestion = questionService.getQuestionsByText(searchText);

        // Assert
        assertEquals(expectedQuestion, actualQuestion);
        verify(questionRepository, times(1)).findByQuestionTextContainingIgnoreCase(searchText);
    }
}
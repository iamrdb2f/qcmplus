package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.service.QuestionService;
import com.pmn.qcmplus.service.QuizService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;
    private final QuizService quizService;

    @Autowired
    public QuestionController(QuestionService questionService, QuizService quizService) {
        this.questionService = questionService;
        this.quizService = quizService;
    }

    @GetMapping("/quizzes/{quizId}")
    public ResponseEntity<List<Question>> getQuestionsByQuizId(@PathVariable Integer quizId) {
        List<Question> questions = questionService.getQuestionsByQuizId(quizId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/quizzes/{quizId}")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question, @PathVariable Integer quizId) {
        Quiz quiz = quizService.getQuizById(quizId);
        question.setQuiz(quiz);
        Question createdQuestion = questionService.saveQuestion(question);
        return ResponseEntity.ok(createdQuestion);
    }

    @PutMapping("/{questionId}/quizzes/{quizId}")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question, @PathVariable Integer quizId, @PathVariable Integer questionId) {
        Quiz quiz = quizService.getQuizById(quizId);
        question.setQuiz(quiz);
        question.setQuestionId(questionId);
        Question updatedQuestion = questionService.updateQuestion(question);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/{questionId}/quizzes/{quizId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer quizId, @PathVariable Integer questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{questionId}/quizzes/{quizId}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Integer quizId, @PathVariable Integer questionId) {
        Question question = questionService.getQuestionById(questionId);
        return ResponseEntity.ok(question);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }
}
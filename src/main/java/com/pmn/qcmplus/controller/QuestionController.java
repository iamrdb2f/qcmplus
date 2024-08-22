package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Question;
import com.pmn.qcmplus.model.Quiz;
import com.pmn.qcmplus.service.QuestionService;
import com.pmn.qcmplus.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/quizzes/{quizId}/questions")
public class QuestionController {

    private final QuestionService questionService;
    private final QuizService quizService;

    @Autowired
    public QuestionController(QuestionService questionService, QuizService quizService) {
        this.questionService = questionService;
        this.quizService = quizService;
    }

    @GetMapping
    public ResponseEntity<List<Question>> getQuestionsByQuizId(@PathVariable Integer quizId) {
        List<Question> questions = questionService.getQuestionsByQuizId(quizId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question, @PathVariable Integer quizId) {
        Quiz quiz = quizService.getQuizById(quizId);
        question.setQuiz(quiz);
        Question createdQuestion = questionService.saveQuestion(question);
        return ResponseEntity.ok(createdQuestion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer quizId, @PathVariable Integer id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Integer quizId, @PathVariable Integer id) {
        Question question = questionService.getQuestionById(id);
        return ResponseEntity.ok(question);
    }
}

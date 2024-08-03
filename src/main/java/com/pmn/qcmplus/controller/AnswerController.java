package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.Answer;
import com.pmn.qcmplus.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswersByQuestionId(@PathVariable Integer questionId) {
        return answerService.getAnswersByQuestionId(questionId);
    }

    @GetMapping("/{id}")
    public Answer getAnswerById(@PathVariable Integer id) {
        return answerService.getAnswerById(id);
    }

    @PostMapping
    public Answer createAnswer(@RequestBody Answer answer) {
        return answerService.saveAnswer(answer);
    }

    @PutMapping("/{id}")
    public Answer updateAnswer(@PathVariable Integer id, @RequestBody Answer answerDetails) {
        Answer answer = answerService.getAnswerById(id);
        if (answer != null) {
            answer.setAnswerText(answerDetails.getAnswerText());
            answer.setCorrect(answerDetails.isCorrect()); // Use setCorrect instead of setIsCorrect
            answer.setQuestion(answerDetails.getQuestion());
            return answerService.saveAnswer(answer);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteAnswer(@PathVariable Integer id) {
        answerService.deleteAnswer(id);
    }
}

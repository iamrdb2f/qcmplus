package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.UserAnswer;
import com.pmn.qcmplus.service.UserAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user_answers")
public class UserAnswerController {

    private final UserAnswerService userAnswerService;

    @Autowired
    public UserAnswerController(UserAnswerService userAnswerService) {
        this.userAnswerService = userAnswerService;
    }

    @PostMapping
    public ResponseEntity<UserAnswer> submitUserAnswer(@RequestBody UserAnswer userAnswer) {
        UserAnswer createdUserAnswer = userAnswerService.saveUserAnswer(userAnswer);
        return ResponseEntity.ok(createdUserAnswer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAnswer> getUserAnswerById(@PathVariable Integer id) {
        UserAnswer userAnswer = userAnswerService.getUserAnswerById(id);
        return ResponseEntity.ok(userAnswer);
    }

    @GetMapping
    public ResponseEntity<List<UserAnswer>> getAllUserAnswers() {
        List<UserAnswer> userAnswers = userAnswerService.getAllUserAnswers();
        return ResponseEntity.ok(userAnswers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAnswer> updateUserAnswer(@PathVariable Integer id, @RequestBody UserAnswer userAnswerDetails) {
        UserAnswer updatedUserAnswer = userAnswerService.updateUserAnswer(id, userAnswerDetails);
        return ResponseEntity.ok(updatedUserAnswer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserAnswer(@PathVariable Integer id) {
        userAnswerService.deleteUserAnswer(id);
        return ResponseEntity.noContent().build();
    }
}

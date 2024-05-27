package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.model.Trainee;
import com.qcmplus.qcmplus.service.TraineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TraineeController {
    private final TraineeService traineeService;

    @Autowired
    public TraineeController(TraineeService traineeService) {
        this.traineeService = traineeService;
    }

    @GetMapping("/trainees")
    public ResponseEntity<List<Trainee>> getAllTrainees() {
        return ResponseEntity.ok(traineeService.getAllTrainees());
    }

    @PostMapping("/trainee")
    public ResponseEntity<Trainee> createTrainee(@RequestBody Trainee trainee) {
        return ResponseEntity.ok(traineeService.saveTrainee(trainee));
    }

    @GetMapping("/trainee/{id}")
    public ResponseEntity<Optional<Trainee>> getTraineeById(@PathVariable Long id) {
        return ResponseEntity.ok(traineeService.getTraineeById(id));
    }

    @PostMapping("/trainee/{id}")
    public ResponseEntity<Trainee> updateTrainee(@PathVariable Long id, @RequestBody Trainee traineeDetails) throws Exception {
        return ResponseEntity.ok(traineeService.updateTrainee(id, traineeDetails));
    }

    @DeleteMapping("/trainee/{id}")
    public ResponseEntity<String> deleteTrainee(@PathVariable Long id) {
        traineeService.deleteTrainee(id);
        return ResponseEntity.ok("Trainee with id " + id + " deleted successfully");
    }
}
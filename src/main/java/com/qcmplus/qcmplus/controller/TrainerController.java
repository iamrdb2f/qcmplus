package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.model.Trainer;
import com.qcmplus.qcmplus.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TrainerController {
    private final TrainerService trainerService;

    @Autowired
    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @GetMapping("/trainers")
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        return ResponseEntity.ok(trainerService.getAllTrainers());
    }

    @PostMapping("/trainer")
    public ResponseEntity<Trainer> createTrainer(@RequestBody Trainer trainer) {
        return ResponseEntity.ok(trainerService.saveTrainer(trainer));
    }

    @GetMapping("/trainer/{id}")
    public ResponseEntity<Optional<Trainer>> getTrainerById(@PathVariable Long id) {
        return ResponseEntity.ok(trainerService.getTrainerById(id));
    }

    @PostMapping("/trainer/{id}")
    public ResponseEntity<Trainer> updateTrainer(@PathVariable Long id, @RequestBody Trainer trainerDetails) throws Exception {
        return ResponseEntity.ok(trainerService.updateTrainer(id, trainerDetails));
    }

    @DeleteMapping("/trainer/{id}")
    public ResponseEntity<String> deleteTrainer(@PathVariable Long id) {
        trainerService.deleteTrainer(id);
        return ResponseEntity.ok("Trainer with id " + id + " deleted successfully");
    }
}
package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.exception.TraineeEmailAlreadyInUseException;
import com.qcmplus.qcmplus.exception.TraineeNotFoundException;
import com.qcmplus.qcmplus.model.Trainee;
import com.qcmplus.qcmplus.service.TraineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trainee") // New request mapping at the controller level.
public class TraineeController {

    private final TraineeService traineeService;

    @Autowired
    public TraineeController(TraineeService traineeService) {
        this.traineeService = traineeService;
    }

    @GetMapping
    public ResponseEntity<List<Trainee>> getAllTrainees() {
        return new ResponseEntity<>(traineeService.getAllTrainees(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trainee> getTraineeById(@PathVariable Long id) {
        Optional<Trainee> trainee = traineeService.getTraineeById(id);
        return trainee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Trainee> createTrainee(@RequestBody Trainee trainee) {
        try {
            Trainee savedTrainee = traineeService.saveTrainee(trainee);
            return new ResponseEntity<>(savedTrainee, HttpStatus.CREATED);
        } catch (TraineeEmailAlreadyInUseException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> updateTrainee(@PathVariable Long id, @RequestBody Trainee traineeDetails) {
        try {
            Trainee updatedTrainee = traineeService.updateTrainee(id, traineeDetails);
            return ResponseEntity.ok(updatedTrainee);
        } catch (TraineeEmailAlreadyInUseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrainee(@PathVariable Long id) {
        if(traineeService.existsById(id)) {
            traineeService.deleteTrainee(id);
            return new ResponseEntity<>("Trainee with ID " + id + " deleted successfully", HttpStatus.OK);
        } else {
            throw new TraineeNotFoundException(Math.toIntExact(id));
        }
    }
}

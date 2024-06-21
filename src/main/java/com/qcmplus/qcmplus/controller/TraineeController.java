package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.model.Trainee;
import com.qcmplus.qcmplus.service.TraineeService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<Trainee> updateTrainee(@PathVariable Long id, @RequestBody Trainee updatedTrainee) {
        Optional<Trainee> optionalTrainee = traineeService.findById(id);
        if (optionalTrainee.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Trainee existingTrainee = optionalTrainee.get();

        if (updatedTrainee.getFirstName() != null) {
            existingTrainee.setFirstName(updatedTrainee.getFirstName());
        }
        if (updatedTrainee.getLastName() != null) {
            existingTrainee.setLastName(updatedTrainee.getLastName());
        }
        if (updatedTrainee.getEmail() != null) {
            existingTrainee.setEmail(updatedTrainee.getEmail());
        }
        if (updatedTrainee.getPassword() != null) {
            existingTrainee.setPassword(updatedTrainee.getPassword());
        }
        if (updatedTrainee.getGender() != null) {
            existingTrainee.setGender(updatedTrainee.getGender());
        }
        if (updatedTrainee.getCompany() != null) {
            existingTrainee.setCompany(updatedTrainee.getCompany());
        }
        if (updatedTrainee.getJobTitle() != null) {
            existingTrainee.setJobTitle(updatedTrainee.getJobTitle());
        }

        // Add other fields as necessary

        Trainee savedTrainee = traineeService.save(existingTrainee);
        return ResponseEntity.ok(savedTrainee);
    }


    @DeleteMapping("/trainee/{id}")
    public ResponseEntity<String> deleteTrainee(@PathVariable Long id) {
        traineeService.deleteTrainee(id);
        return ResponseEntity.ok("Trainee with id " + id + " deleted successfully");
    }
}
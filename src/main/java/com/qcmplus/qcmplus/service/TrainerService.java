package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.Trainer;
import com.qcmplus.qcmplus.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerService {

    private final TrainerRepository traineeRepository;

    @Autowired
    public TrainerService(TrainerRepository traineeRepository) {
        this.traineeRepository = traineeRepository;
    }

    public Trainer saveTrainer(Trainer trainee) {
        return traineeRepository.save(trainee);
    }

    public List<Trainer> getAllTrainers() {
        return traineeRepository.findAll();
    }

    public Optional<Trainer> getTrainerById(Long id) {
        return traineeRepository.findById(id);
    }

    public Trainer updateTrainer(Long id, Trainer traineeDetails) throws Exception {
        Optional<Trainer> optionalTrainer = traineeRepository.findById(id);
        if (optionalTrainer.isPresent()) {
            Trainer trainee = optionalTrainer.get();
            trainee.setLastName(traineeDetails.getLastName());
            trainee.setFirstName(traineeDetails.getFirstName());
            trainee.setEmail(traineeDetails.getEmail());
            trainee.setPassword(traineeDetails.getPassword());
            return traineeRepository.save(trainee);
        } else {
            throw new Exception("Trainer not found with id " + id);
        }
    }

    public void deleteTrainer(Long id) {
        traineeRepository.deleteById(id);
    }
}

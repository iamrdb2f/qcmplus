package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.Trainee;
import com.qcmplus.qcmplus.repository.TraineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TraineeService {

    private final TraineeRepository traineeRepository;

    @Autowired
    public TraineeService(TraineeRepository traineeRepository) {
        this.traineeRepository = traineeRepository;
    }

    public Trainee saveTrainee(Trainee trainee) {
        return traineeRepository.save(trainee);
    }

    public List<Trainee> getAllTrainees() {
        return traineeRepository.findAll();
    }

    public Optional<Trainee> getTraineeById(Long id) {
        return traineeRepository.findById(id);
    }

    public Trainee updateTrainee(Long id, Trainee traineeDetails) throws Exception {
        Optional<Trainee> optionalTrainee = traineeRepository.findById(id);
        if (optionalTrainee.isPresent()) {
            Trainee trainee = optionalTrainee.get();
            trainee.setLastName(traineeDetails.getLastName());
            trainee.setFirstName(traineeDetails.getFirstName());
            trainee.setEmail(traineeDetails.getEmail());
            trainee.setPassword(traineeDetails.getPassword());
            return traineeRepository.save(trainee);
        } else {
            throw new Exception("Trainee not found with id " + id);
        }
    }

    public void deleteTrainee(Long id) {
        traineeRepository.deleteById(id);
    }
}

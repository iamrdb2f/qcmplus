package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.exception.TraineeEmailAlreadyInUseException;
import com.qcmplus.qcmplus.exception.TraineeNotFoundException;
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

    public List<Trainee> getAllTrainees() {
        return traineeRepository.findAll();
    }

    public Optional<Trainee> getTraineeById(Long id) {
        return traineeRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return traineeRepository.existsById(id);
    }

    public Trainee saveTrainee(Trainee trainee) {
        verifyEmail(trainee);
        return traineeRepository.save(trainee);
    }

    public void deleteTrainee(Long id) {
        traineeRepository.deleteById(id);
    }

    public Trainee updateTrainee(Long id, Trainee traineeDetails) {
        Optional<Trainee> existingTrainee = traineeRepository.findByEmailAndUserIdNot(traineeDetails.getEmail(), traineeDetails.getUserId());
        if (existingTrainee.isPresent()) {
            throw new TraineeEmailAlreadyInUseException("Email already in use.");
        }

        Trainee trainee = traineeRepository.findById(id).orElseThrow(() -> new TraineeNotFoundException(id.intValue()));
        trainee.setFirstName(traineeDetails.getFirstName());
        trainee.setLastName(traineeDetails.getLastName());
        trainee.setEmail(traineeDetails.getEmail());
        trainee.setUserRole(traineeDetails.getUserRole());
        trainee.setGender(traineeDetails.getGender());
        trainee.setCompany(traineeDetails.getCompany());
        trainee.setJobTitle(traineeDetails.getJobTitle());
        trainee.setPhoneNumber(traineeDetails.getPhoneNumber());
        return traineeRepository.save(trainee);
    }

    void verifyEmail(Trainee trainee) {
        Optional<Trainee> existingTrainee = traineeRepository.findByEmailAndUserIdNot(trainee.getEmail(), trainee.getUserId());
        if (existingTrainee.isPresent()) {
            throw new TraineeEmailAlreadyInUseException(trainee.getEmail());
        }
    }
}

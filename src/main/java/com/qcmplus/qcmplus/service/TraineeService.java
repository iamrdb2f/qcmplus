package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.Trainee;
import com.qcmplus.qcmplus.repository.TraineeRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

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

    public Optional<Trainee> findById(Long userId) {
        return traineeRepository.findById(userId);
    }

    public Trainee save(Trainee trainee) {
        return traineeRepository.save(trainee);
    }

    public Trainee updateTrainee(Long id, Trainee traineeDetails) throws Exception {
        Optional<Trainee> optionalTrainee = traineeRepository.findById(id);

        if (optionalTrainee.isEmpty()) {
            throw new Exception("Trainee not found");
        }

        Trainee existingTrainee = optionalTrainee.get();

        if (traineeDetails.getFirstName() != null) {
            existingTrainee.setFirstName(traineeDetails.getFirstName());
        }
        if (traineeDetails.getLastName() != null) {
            existingTrainee.setLastName(traineeDetails.getLastName());
        }
        if (traineeDetails.getEmail() != null) {
            existingTrainee.setEmail(traineeDetails.getEmail());
        }
        if (traineeDetails.getPassword() != null) {
            existingTrainee.setPassword(traineeDetails.getPassword());
        }
        if (traineeDetails.getPhoneNumber() != null) {
            existingTrainee.setPhoneNumber(traineeDetails.getPhoneNumber());
        }
        if (traineeDetails.getGender() != null) {
            existingTrainee.setGender(traineeDetails.getGender());
        }
        if (traineeDetails.getCompany() != null) {
            existingTrainee.setCompany(traineeDetails.getCompany());
        }
        if (traineeDetails.getJobTitle() != null) {
            existingTrainee.setJobTitle(traineeDetails.getJobTitle());
        }

        try {
            return traineeRepository.save(existingTrainee);
        } catch (DataIntegrityViolationException e) {
            throw new Exception("Failed to update trainee: " + e.getMessage());
        }
    }

    public void deleteTrainee(Long id) {
        traineeRepository.deleteById(id);
    }
}

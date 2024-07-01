package com.qcmplus.qcmplus.exception;

public class TraineeNotFoundException extends RuntimeException {
    public TraineeNotFoundException(int id) {
        super("Trainee with ID " + id + " not found.");
    }
}

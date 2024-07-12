package com.pmn.qcmplus.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User with ID " + id + " not found.");
    }
}

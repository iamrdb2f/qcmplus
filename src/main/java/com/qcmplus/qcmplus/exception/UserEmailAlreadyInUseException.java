package com.qcmplus.qcmplus.exception;

public class UserEmailAlreadyInUseException extends RuntimeException {
    public UserEmailAlreadyInUseException(String email) {
        super("The email " + email + " is already in use.");
    }
}

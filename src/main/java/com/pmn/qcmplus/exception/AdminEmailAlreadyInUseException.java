package com.pmn.qcmplus.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AdminEmailAlreadyInUseException extends RuntimeException {

    public AdminEmailAlreadyInUseException(String email) {
        super("Email " + email + " is already in use by another user.");
    }
}

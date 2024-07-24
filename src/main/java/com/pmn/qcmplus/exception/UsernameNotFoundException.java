package com.pmn.qcmplus.exception;


public class UsernameNotFoundException extends RuntimeException {
    public UsernameNotFoundException(String email) {
        super("User with email " + email + " not found.");
    }
}

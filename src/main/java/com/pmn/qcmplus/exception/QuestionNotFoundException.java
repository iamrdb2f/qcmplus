package com.pmn.qcmplus.exception;

public class QuestionNotFoundException extends RuntimeException {
    public QuestionNotFoundException(Integer id) {
        super("Question with id " + id + " not found.");
    }
}
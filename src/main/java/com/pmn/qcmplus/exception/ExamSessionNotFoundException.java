package com.pmn.qcmplus.exception;

public class ExamSessionNotFoundException extends RuntimeException {
    public ExamSessionNotFoundException(Integer id) {
        super("ExamSession not found with id: " + sessionId);
    }
}

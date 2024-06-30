package com.qcmplus.qcmplus.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AdminNotFoundException extends IllegalArgumentException {
    private final int adminId;

    public AdminNotFoundException(int adminId) {
        super("Admin with ID " + adminId + " does not exist");
        this.adminId = adminId;
    }

}
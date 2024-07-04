package com.qcmplus.qcmplus.model;

public enum Role {
    // An ADMIN is a user who has all the access permissions.
    ADMIN("Administrator"),
    // A TRAINEE is a user who has limited access permissions.
    TRAINEE("Trainee");

    private final String label;

    Role(String label) {
        this.label = label;
    }

    public String getLabel() {
        return this.label;
    }

}
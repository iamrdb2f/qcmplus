package com.qcmplus.qcmplus.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@DiscriminatorValue("TEACHER")
public class Teacher extends User {
    // Additional fields and methods specific to Teacher
}

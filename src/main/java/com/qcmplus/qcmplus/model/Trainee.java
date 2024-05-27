package com.qcmplus.qcmplus.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@DiscriminatorValue("TRAINEE")
public class Trainee extends User {
    // Additional fields and methods specific to Trainee
}


package com.qcmplus.qcmplus.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends User {
    @JsonProperty("gender")
    @Column(name = "gender")
    private String gender;

    @JsonProperty("jobTitle")
    @Column(name = "job_title")
    private String jobTitle;
}

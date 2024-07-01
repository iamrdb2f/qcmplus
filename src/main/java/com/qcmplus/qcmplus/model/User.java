package com.qcmplus.qcmplus.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_role", discriminatorType = DiscriminatorType.STRING)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @JsonProperty("lastName")
    @Column(name = "last_name")
    private String lastName;

    @JsonProperty("firstName")
    @Column(name = "first_name")
    private String firstName;

    @JsonProperty("email")
    @Column(name = "email", unique = true)
    private String email;

    @JsonProperty("password")
    @Column(name = "password")
    private String password;

    @JsonProperty("company")
    @Column(name = "company")
    private String company;

    @JsonProperty("phoneNumber")
    @Column(name = "phone_number")
    private String phoneNumber;

    @JsonProperty("userRole")
    @Column(name = "user_role", insertable = false, updatable = false)
    private String userRole;


}

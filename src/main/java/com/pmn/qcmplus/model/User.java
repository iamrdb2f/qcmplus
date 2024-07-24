package com.pmn.qcmplus.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@NamedQuery(name = "User.byId", query = "select u from User u where u.id= :id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @Column(name = "email", nullable = false, unique = true)
    @JsonProperty("email")
    private String email;

    @Column(name = "password", nullable = false)
    @JsonProperty("password")
    private String password;

    @Column(name = "last_name", nullable = false)
    @JsonProperty("lastName")
    private String lastName;

    @Column(name = "first_name", nullable = false)
    @JsonProperty("firstName")
    private String firstName;

    @Column(name = "gender", nullable = false)
    @JsonProperty("gender")
    private String gender;

    @Column(name = "company")
    @JsonProperty("company")
    private String company;

    @Column(name = "job_title")
    @JsonProperty("jobTitle")
    private String jobTitle;

    @Column(name = "phone_number")
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @Column(name = "is_active")
    @JsonProperty("isActive")
    private Boolean isActive;

    @Column(name = "created_date")
    @JsonProperty("createdDate")
    private Timestamp createdDate;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
}

package com.pmn.qcmplus.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pmn.qcmplus.model.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;

    @JsonProperty("lastName")
    private String lastName;

    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("gender")
    private Gender gender;

    @JsonProperty("company")
    private String company;

    @JsonProperty("jobTitle")
    private String jobTitle;

    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @JsonProperty("roles")
    private Set<RoleDTO> roles;

    @JsonProperty("isActive")
    private boolean isActive;

    @JsonProperty("createdDate")
    private Date createdDate;
}

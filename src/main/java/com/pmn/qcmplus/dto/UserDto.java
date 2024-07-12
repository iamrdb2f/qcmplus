package com.pmn.qcmplus.dto;

import com.pmn.qcmplus.model.Gender;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class UserDto {

    private Long id;
    private String email;
    private String password;
    private String lastName;
    private String firstName;
    private Gender gender;
    private String company;
    private String jobTitle;
    private String phoneNumber;
    private Set<RoleDto> roles;
    private boolean isActive;
    private Date createdDate;

}
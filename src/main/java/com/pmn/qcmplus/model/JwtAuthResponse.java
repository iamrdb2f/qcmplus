package com.pmn.qcmplus.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {
    private int userId;
    private String accessToken;
    private String userEmail;
    private String userLastName;
    private String userFirstName;
    private String role;
    private String userJob;


    //implement the equals and hashCode methods to ensure that they are correctly comparing the relevant fields.
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JwtAuthResponse that = (JwtAuthResponse) o;
        return Objects.equals(accessToken, that.accessToken) &&
                Objects.equals(userEmail, that.userEmail) &&
                Objects.equals(userLastName, that.userLastName) &&
                Objects.equals(userFirstName, that.userFirstName) &&
                Objects.equals(role, that.role) &&
                Objects.equals(userJob, that.userJob);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accessToken, userEmail, userLastName, userFirstName, role, userJob);
    }
}

package com.pmn.qcmplus.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RoleDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("role_name")
    private String roleName;
}

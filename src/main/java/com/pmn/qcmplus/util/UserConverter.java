package com.pmn.qcmplus.util;

import com.pmn.qcmplus.dto.UserWithRolesDTO;
import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.model.User;

import java.util.stream.Collectors;

public class UserConverter {

    public static UserWithRolesDTO convertToUserWithRolesDTO(User user) {
        UserWithRolesDTO dto = new UserWithRolesDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setLastName(user.getLastName());
        dto.setFirstName(user.getFirstName());
        dto.setGender(user.getGender());
        dto.setCompany(user.getCompany());
        dto.setJobTitle(user.getJobTitle());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setActive(user.isActive());
        dto.setCreatedDate(user.getCreatedDate());
        dto.setRoles(user.getRoles().stream().map(role -> {
            UserWithRolesDTO.RoleDTO roleDTO = new UserWithRolesDTO.RoleDTO();
            roleDTO.setId(role.getId());
            roleDTO.setRoleName(role.getRoleName());
            return roleDTO;
        }).collect(Collectors.toSet()));
        return dto;
    }

    public static User convertToEntity(UserWithRolesDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setLastName(dto.getLastName());
        user.setFirstName(dto.getFirstName());
        user.setGender(dto.getGender());
        user.setCompany(dto.getCompany());
        user.setJobTitle(dto.getJobTitle());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setActive(dto.isActive());
        user.setCreatedDate(dto.getCreatedDate());
        user.setRoles(dto.getRoles().stream().map(UserConverter::convertRoleToEntity).collect(Collectors.toSet()));
        return user;
    }

    public static Role convertRoleToEntity(UserWithRolesDTO.RoleDTO roleDTO) {
        Role role = new Role();
        role.setId(roleDTO.getId());
        role.setRoleName(roleDTO.getRoleName());
        return role;
    }
}

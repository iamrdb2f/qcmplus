package com.pmn.qcmplus.util;

import com.pmn.qcmplus.dto.RoleDTO;
import com.pmn.qcmplus.dto.UserDTO;
import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.model.User;

import java.util.stream.Collectors;

public class UserConverter {

    public static UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setLastName(user.getLastName());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setGender(user.getGender());
        userDTO.setCompany(user.getCompany());
        userDTO.setJobTitle(user.getJobTitle());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRoles(user.getRoles().stream().map(UserConverter::convertRoleToDTO).collect(Collectors.toSet()));
        userDTO.setActive(user.isActive());
        userDTO.setCreatedDate(user.getCreatedDate());
        return userDTO;
    }

    public static User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setLastName(userDTO.getLastName());
        user.setFirstName(userDTO.getFirstName());
        user.setGender(userDTO.getGender());
        user.setCompany(userDTO.getCompany());
        user.setJobTitle(userDTO.getJobTitle());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setRoles(userDTO.getRoles().stream().map(UserConverter::convertRoleToEntity).collect(Collectors.toSet()));
        user.setActive(userDTO.isActive());
        user.setCreatedDate(userDTO.getCreatedDate());
        return user;
    }

    public static RoleDTO convertRoleToDTO(Role role) {
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(role.getId());
        roleDTO.setRoleName(role.getRole_name());
        return roleDTO;
    }

    public static Role convertRoleToEntity(RoleDTO roleDTO) {
        Role role = new Role();
        role.setId(roleDTO.getId());
        role.setRole_name(roleDTO.getRoleName());
        return role;
    }
}

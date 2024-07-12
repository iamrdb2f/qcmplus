package com.pmn.qcmplus.util;

import org.springframework.stereotype.Component;
import com.pmn.qcmplus.dto.UserDto;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.dto.RoleDto;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserConverter {

    public UserDto entityToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        // please, consider not to transfer password or hash it well
        dto.setPassword(user.getPassword());
        dto.setLastName(user.getLastName());
        dto.setFirstName(user.getFirstName());
        dto.setGender(user.getGender());
        dto.setCompany(user.getCompany());
        dto.setJobTitle(user.getJobTitle());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setActive(user.isActive());
        dto.setCreatedDate(user.getCreatedDate());

        Set<RoleDto> roleDtos = user.getRoles().stream()
                .map(this::convertRoleEntityToDto)
                .collect(Collectors.toSet());

        dto.setRoles(roleDtos);

        return dto;
    }

    public User dtoToEntity(UserDto dto) {
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

        // consider not to set createdDate from DTO
        user.setCreatedDate(dto.getCreatedDate());
        Set<Role> roles = dto.getRoles().stream()
                .map(this::convertRoleDtoToEntity)
                .collect(Collectors.toSet());

        user.setRoles(roles);

        return user;
    }

    private RoleDto convertRoleEntityToDto(Role role) {
        RoleDto dto = new RoleDto();
        dto.setId(role.getId());

        dto.setRoleName(role.getRoleName());
        return dto;
    }

    private Role convertRoleDtoToEntity(RoleDto dto) {
        Role role = new Role();
        role.setId(dto.getId());
        role.setRoleName(dto.getRoleName());

        return role;
    }
}

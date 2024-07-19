package com.pmn.qcmplus.service;

import com.pmn.qcmplus.dto.UserWithRolesDTO;

import java.util.List;

public interface UserService {
    List<UserWithRolesDTO> getAllUsers();

    UserWithRolesDTO getUserById(Integer id);
    boolean existsById(Integer id);

    UserWithRolesDTO saveUser(UserWithRolesDTO userDTO);
    void deleteUser(Integer id);

    UserWithRolesDTO updateUser(Integer id, UserWithRolesDTO userDTO);
}
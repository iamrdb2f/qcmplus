package com.pmn.qcmplus.service;

import com.pmn.qcmplus.dto.UserDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Integer id);
    boolean existsById(Integer id);
    UserDTO saveUser(UserDTO userDTO);
    void deleteUser(Integer id);
    UserDTO updateUser(Integer id, UserDTO userDTO);
}

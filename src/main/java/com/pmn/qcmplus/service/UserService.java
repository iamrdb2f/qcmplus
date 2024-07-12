package com.pmn.qcmplus.service;

import com.pmn.qcmplus.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();
    UserDto getUserById(Long id);
    boolean existsById(Long id);
    UserDto saveUser(UserDto UserDto);
    void deleteUser(Long id);
    UserDto updateUser(Long id, UserDto UserDto);
}

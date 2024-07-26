package com.pmn.qcmplus.service;

import com.pmn.qcmplus.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<String> getAllRoles();
    User createUser(User user);
    Optional<User> getUserById(Integer id);
    List<User> getAllUsers();
    User updateUser(Integer id, User user);
    void deleteUser(Integer id);
    User updateUserRole(Integer userId, Integer roleId);

    User getUserWithRole(Integer id);
}

package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.User;
import com.qcmplus.qcmplus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }
    // In UserService.java
    public User updateUser(User user) throws Exception {
        Optional<User> existingUser = userRepository.findByEmailAndUserIdNot(user.getEmail(), user.getUserId());
        if (existingUser.isPresent()) {
            throw new Exception("Email already in use by another user.");
        }
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}

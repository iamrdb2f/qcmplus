package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.exception.UserEmailAlreadyInUseException;
import com.qcmplus.qcmplus.exception.UserNotFoundException;
import com.qcmplus.qcmplus.model.User;
import com.qcmplus.qcmplus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(Math.toIntExact(id));
    }

    public boolean existsById(Integer id) {
        return userRepository.existsById(id);
    }

    public User saveUser(User user) {
        if (user.getId() != null) {
            verifyEmail(user);
            if (!user.isActive()) {
                user.setActive(true);
            }
        }
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    public User updateUser(Integer id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        user.setGender(userDetails.getGender());
        user.setCompany(userDetails.getCompany());
        user.setJobTitle(userDetails.getJobTitle());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setActive(userDetails.isActive());
        user.setCreatedDate(userDetails.getCreatedDate() != null ? userDetails.getCreatedDate() : new Timestamp(System.currentTimeMillis()));

        verifyEmail(user);

        return userRepository.save(user);
    }

    private void verifyEmail(User user) {
        Optional<User> existingUser = userRepository.findByEmailAndIdNot(user.getEmail(), user.getId());
        if (existingUser.isPresent()) {
            throw new UserEmailAlreadyInUseException("Email already in use: " + user.getEmail());
        }
    }

}

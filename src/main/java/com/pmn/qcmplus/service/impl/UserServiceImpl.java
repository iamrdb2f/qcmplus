package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.dto.UserDTO;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.repository.UserRepository;
import com.pmn.qcmplus.service.UserService;
import com.pmn.qcmplus.util.UserConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(UserConverter::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(UserConverter::convertToDTO).orElse(null);
    }

    @Override
    public boolean existsById(Integer id) {
        return userRepository.existsById(id);
    }

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        User user = UserConverter.convertToEntity(userDTO);
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        User savedUser = userRepository.save(user);
        return UserConverter.convertToDTO(savedUser);
    }

    @Override
    public void deleteUser(Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
    }

    @Override
    public UserDTO updateUser(Integer id, UserDTO userDTO) {
        if (userRepository.existsById(id)) {
            User user = UserConverter.convertToEntity(userDTO);
            user.setId(id); // Ensure the entity has the correct ID
            if (user.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            User updatedUser = userRepository.save(user);
            return UserConverter.convertToDTO(updatedUser);
        }
        return null; // or throw an exception indicating user not found
    }
}

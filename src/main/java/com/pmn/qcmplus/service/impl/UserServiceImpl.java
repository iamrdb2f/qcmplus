package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.dto.UserDto;
import com.pmn.qcmplus.exception.UserEmailAlreadyInUseException;
import com.pmn.qcmplus.exception.UserNotFoundException;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.repository.UserRepository;
import com.pmn.qcmplus.service.UserService;
import com.pmn.qcmplus.util.UserConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    private PasswordEncoder passwordEncoder;


    private UserConverter userConverter;

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(userConverter::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(userConverter::entityToDto).orElse(null);
    }

    @Override
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    @Transactional
    public UserDto saveUser(UserDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new UserEmailAlreadyInUseException(userDto.getEmail());
        }
        User user = userConverter.dtoToEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Encode password before saving
        User savedUser = userRepository.save(user);
        return userConverter.entityToDto(savedUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new UserNotFoundException(id);
        }
    }

    @Override
    @Transactional
    public UserDto updateUser(Long id, UserDto userDto) {
        if (userRepository.existsById(id)) {
            User user = userConverter.dtoToEntity(userDto);
            user.setId(id);
            if (userDto.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(userDto.getPassword())); // Encode password before updating
            }
            User updatedUser = userRepository.save(user);
            return userConverter.entityToDto(updatedUser);
        } else {
            throw new UserNotFoundException(id);
        }
    }
}

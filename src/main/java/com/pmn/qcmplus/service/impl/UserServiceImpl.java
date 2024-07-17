package com.pmn.qcmplus.service.impl;

import com.pmn.qcmplus.dto.UserDTO;
import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.repository.RoleRepository;
import com.pmn.qcmplus.repository.UserRepository;
import com.pmn.qcmplus.service.UserService;
import com.pmn.qcmplus.util.UserConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

   // @Autowired
   // private PasswordEncoder passwordEncoder;

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

        // Check if roles are present
        if (userDTO.getRoles() != null && !userDTO.getRoles().isEmpty()) {
            Set<Role> roles = userDTO.getRoles()
                    .stream()
                    .map(roleDTO -> roleRepository.findById(roleDTO.getId())
                            .orElseThrow(() -> new IllegalArgumentException("Role with id " + roleDTO.getId() + " not found")))
                    .collect(Collectors.toSet());

            user.setRoles(roles);
        } else {
            throw new IllegalArgumentException("At least one role is required");
        }

        if (user.getPassword() == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }

        user.setPassword(user.getPassword());
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
        User existingUser = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (userDTO.getEmail() != null)
            existingUser.setEmail(userDTO.getEmail());

        if (userDTO.getPassword() != null) {
            //TODO HASH PASSWORD
            // user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            existingUser.setPassword(userDTO.getPassword());
        }

        if (userDTO.getLastName() != null)
            existingUser.setLastName(userDTO.getLastName());

        if (userDTO.getFirstName() != null)
            existingUser.setFirstName(userDTO.getFirstName());

        if (userDTO.getGender() != null)
            existingUser.setGender(userDTO.getGender());

        if (userDTO.getCompany() != null)
            existingUser.setCompany(userDTO.getCompany());

        if (userDTO.getJobTitle() != null)
            existingUser.setJobTitle(userDTO.getJobTitle());

        if (userDTO.getPhoneNumber() != null)
            existingUser.setPhoneNumber(userDTO.getPhoneNumber());

        if (userDTO.getRoles() != null)
            existingUser.setRoles(userDTO.getRoles().stream().map(UserConverter::convertRoleToEntity).collect(Collectors.toSet()));

        existingUser.setActive(userDTO.isActive());

        if (userDTO.getCreatedDate() != null)
            existingUser.setCreatedDate(userDTO.getCreatedDate());

        User updatedUser = userRepository.save(existingUser);

        return UserConverter.convertToDTO(updatedUser);
    }
}

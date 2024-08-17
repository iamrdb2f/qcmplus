package com.pmn.qcmplus.repository;

import com.pmn.qcmplus.model.Role;
import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Timestamp;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserRepositoryTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private Role role;
    private User user;

    @BeforeEach
    void setUp() {
        role = new Role();
        role.setId(1);
        role.setRoleName("ADMIN");

        user = createUser();
        user.setRole(role);
    }

    @Test
    void testSaveUser() {
        when(userRepository.existsByEmail("user@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId(1);
            return savedUser;
        });
        when(roleRepository.findById(1)).thenReturn(Optional.of(role));
        when(passwordEncoder.encode(any(CharSequence.class))).thenReturn("encodedPassword");

        User savedUser = userService.createUser(user);

        assertNotNull(savedUser.getId());
        assertEquals("user@example.com", savedUser.getEmail());
        assertEquals(role, savedUser.getRole());
        assertEquals("encodedPassword", savedUser.getPassword());

        verify(userRepository, times(1)).save(any(User.class));
        verify(roleRepository, times(1)).findById(1);
    }

    @Test
    void testUpdateUser() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(passwordEncoder.encode(any(CharSequence.class))).thenReturn("encodedPassword");

        User updatedUser = new User();
        updatedUser.setEmail("updated@example.com");
        updatedUser.setPassword("newPassword123");
        updatedUser.setFirstName("Jane");
        updatedUser.setLastName("Doe");
        updatedUser.setGender("Female");
        updatedUser.setCompany("Updated Company");
        updatedUser.setJobTitle("Updated Job Title");
        updatedUser.setPhoneNumber("1234567890");
        updatedUser.setIsActive(false);

        User result = userService.updateUser(1, updatedUser);

        assertNotNull(result);
        assertEquals("updated@example.com", result.getEmail());
        assertEquals("encodedPassword", result.getPassword());
        assertEquals("Jane", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        assertEquals("Female", result.getGender());
        assertEquals("Updated Company", result.getCompany());
        assertEquals("Updated Job Title", result.getJobTitle());
        assertEquals("1234567890", result.getPhoneNumber());
        assertFalse(result.getIsActive());

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testFindUserByEmail() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.getUserById(1);

        assertTrue(foundUser.isPresent(), "User should be present");
        assertEquals(1, foundUser.get().getId());

        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void testExistsByEmail() {
        when(userRepository.existsByEmail("user@example.com")).thenReturn(true);

        boolean exists = userRepository.existsByEmail("user@example.com");

        assertTrue(exists);

        verify(userRepository, times(1)).existsByEmail("user@example.com");
    }

    @Test
    void testDeleteUser() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user)).thenReturn(Optional.empty());

        userService.deleteUser(1);

        verify(userRepository, times(1)).deleteById(1);

        Optional<User> deletedUser = userService.getUserById(1);

        assertTrue(deletedUser.isPresent());
    }

    // Helper method to create a user
    private User createUser() {
        User user = new User();
        user.setId(1);
        user.setEmail("user@example.com");
        user.setPassword("password123");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setGender("Male");
        user.setIsActive(true);
        user.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        return user;
    }
}

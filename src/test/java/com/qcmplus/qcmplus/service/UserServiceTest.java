package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.User;
import com.qcmplus.qcmplus.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    void shouldSaveUser() {
        User user = new User();
        user.setUserId(1);

        when(userRepository.save(user)).thenReturn(user);

        User result = userService.saveUser(user);
        assertNotNull(result);
        assertEquals(1, result.getUserId());
    }

    @Test
    void shouldGetAllUsers() {
        User user1 = new User();
        user1.setUserId(1);
        User user2 = new User();
        user2.setUserId(2);

        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        List<User> result = userService.getAllUsers();
        assertNotNull(result);
        assertTrue(result.size() == 2);
    }

    @Test
    void shouldGetUserById() {
        User user = new User();
        user.setUserId(1);

        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserById(1);
        assertNotNull(result);
        assertTrue(result.isPresent());
        assertEquals(1, result.get().getUserId());
    }

    @Test
    void shouldUpdateUser() throws Exception {
        User user = new User();
        user.setUserId(1);
        user.setEmail("test@test.com");

        when(userRepository.findByEmailAndUserIdNot(any(), any())).thenReturn(Optional.empty());
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.updateUser(user);
        assertNotNull(result);
        assertEquals(1, result.getUserId());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void shouldDeleteUser() {
        // method is void. Just test if it's called with correct argument
        userService.deleteUser(1);

        verify(userRepository, times(1)).deleteById(1);
    }
}
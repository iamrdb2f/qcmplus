package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.User;
import com.qcmplus.qcmplus.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(new User()));
        assertEquals(1, userService.getAllUsers().size());
    }

    @Test
    public void testGetUserById() {
        User user = new User();
        user.setId(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        Optional<User> resultUser = userService.getUserById(1);
        assertEquals(user.getId(), resultUser.get().getId());
    }

    @Test
    public void testSaveUser() {
        User user = new User();
        user.setId(1);
        when(userRepository.save(any(User.class))).thenReturn(user);

        User newUser = new User();
        newUser.setId(1);

        User savedUser = userService.saveUser(newUser);

        assertNotNull(savedUser);
        assertEquals(user.getId(), savedUser.getId());
    }
    @Test
    public void testUpdateUser() throws Exception {
        Integer id = 1;

        User oldUser = new User();
        oldUser.setId(id);
        oldUser.setLastName("Doe");
        oldUser.setFirstName("John");
        oldUser.setEmail("john@example.com");
        oldUser.setPassword("123456");

        User newUserDetails = new User();
        newUserDetails.setId(id); // Set ID
        newUserDetails.setLastName("Snow");
        newUserDetails.setFirstName("John");
        newUserDetails.setEmail("john_snow@example.com");
        newUserDetails.setPassword("123456");

        when(userRepository.findById(Integer.valueOf(id))).thenReturn(Optional.of(oldUser));
        when(userRepository.save(any(User.class))).thenReturn(newUserDetails);

        User updatedUser = userService.updateUser(Integer.valueOf(id), newUserDetails);

        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userArgumentCaptor.capture());

        // Check properties
        assertEquals(newUserDetails.getLastName(), updatedUser.getLastName());
        assertEquals(newUserDetails.getFirstName(), updatedUser.getFirstName());
        assertEquals(newUserDetails.getEmail(), updatedUser.getEmail());
        assertEquals(newUserDetails.getPassword(), updatedUser.getPassword());
    }

    @Test
    public void testDeleteUser() {
        userService.deleteUser(1);
        verify(userRepository, times(1)).deleteById(1);
    }

}
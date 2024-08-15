package com.pmn.qcmplus.controller;

import com.pmn.qcmplus.model.User;
import com.pmn.qcmplus.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllRoles() {
        List<String> roles = Arrays.asList("ADMIN", "USER");
        when(userService.getAllRoles()).thenReturn(roles);

        ResponseEntity<List<String>> response = userController.getAllRoles();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(roles, response.getBody());
    }

    @Test
    void testCreateUser() {
        User user = new User();
        user.setEmail("test@example.com");

        when(userService.createUser(any(User.class))).thenReturn(user);

        ResponseEntity<User> response = userController.createUser(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void testGetUserById_Found() {
        User user = new User();
        user.setId(1);
        user.setEmail("test@example.com");

        when(userService.getUserById(1)).thenReturn(Optional.of(user));

        ResponseEntity<User> response = userController.getUserById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void testGetUserById_NotFound() {
        when(userService.getUserById(1)).thenReturn(Optional.empty());

        ResponseEntity<User> response = userController.getUserById(1);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testGetAllUsers() {
        List<User> users = Arrays.asList(new User(), new User());
        when(userService.getAllUsers()).thenReturn(users);

        ResponseEntity<List<User>> response = userController.getAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());
    }

    @Test
    void testUpdateUser_Found() {
        User user = new User();
        user.setId(1);
        user.setEmail("updated@example.com");

        when(userService.updateUser(eq(1), any(User.class))).thenReturn(user);

        ResponseEntity<User> response = userController.updateUser(1, user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void testUpdateUser_NotFound() {
        when(userService.updateUser(eq(1), any(User.class))).thenReturn(null);

        ResponseEntity<User> response = userController.updateUser(1, new User());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testDeleteUser() {
        doNothing().when(userService).deleteUser(1);

        ResponseEntity<Void> response = userController.deleteUser(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userService, times(1)).deleteUser(1);
    }

    @Test
    void testUpdateUserRole_Found() {
        User user = new User();
        user.setId(1);
        user.setEmail("roleupdated@example.com");

        when(userService.updateUserRole(1, 2)).thenReturn(user);

        ResponseEntity<User> response = userController.updateUserRole(1, 2);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void testUpdateUserRole_NotFound() {
        when(userService.updateUserRole(1, 2)).thenReturn(null);

        ResponseEntity<User> response = userController.updateUserRole(1, 2);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }
}

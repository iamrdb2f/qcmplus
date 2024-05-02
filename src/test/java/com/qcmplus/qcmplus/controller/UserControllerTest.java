package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.model.User;
import com.qcmplus.qcmplus.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTest {

    private UserController controller;

    @Mock
    private UserService userService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        controller = new UserController(userService);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void shouldFetchAllUsers() throws Exception {
        User user1 = new User();
        user1.setUserId(1);
        User user2 = new User();
        user2.setUserId(2);

        List<User> users = Arrays.asList(user1, user2);
        when(userService.getAllUsers()).thenReturn(users);

        mockMvc.perform(get("/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void shouldFetchUserById() throws Exception {
        User user = new User();
        user.setUserId(1);

        when(userService.getUserById(1)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void shouldCreateUser() throws Exception {
        User user = new User();
        user.setUserId(1);

        when(userService.saveUser(any(User.class))).thenReturn(user);

        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isCreated());
    }

    @Test
    void shouldUpdateUser() throws Exception {
        User user = new User();
        user.setUserId(1);

        when(userService.updateUser(any(User.class))).thenReturn(user);

        mockMvc.perform(post("/user/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isOk());
    }

    @Test
    void shouldDeleteUser() throws Exception {
        User user = new User();
        user.setUserId(1);

        when(userService.getUserById(1)).thenReturn(Optional.of(user));

        mockMvc.perform(delete("/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        Mockito.verify(userService).deleteUser(1);
    }

    @Test
    void shouldReturnNotFoundForInvalidSingleUser() throws Exception {
        when(userService.getUserById(1)).thenReturn(Optional.empty());

        mockMvc.perform(get("/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
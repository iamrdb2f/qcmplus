package com.qcmplus.qcmplus.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qcmplus.qcmplus.model.User;
import com.qcmplus.qcmplus.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void createUser() throws Exception {
        User user = new User();
        user.setId(1);
        user.setFirstName("Test");
        user.setLastName("User");
        // Set more fields as per your User class

        when(userService.saveUser(any())).thenReturn(user);

        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(status().isCreated());
    }

    @Test
    void updateUser() throws Exception {
        User user = new User();
        user.setId(1);
        user.setFirstName("Test Updated");
        user.setLastName("User");
        // Set more fields as per your User class

        when(userService.updateUser(eq(1), any())).thenReturn(user);

        mockMvc.perform(put("/user/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(status().isOk());
    }

    @Test
    void deleteUser() throws Exception {
        Integer userId = 1;

        when(userService.existsById(userId)).thenReturn(true);
        doNothing().when(userService).deleteUser(userId);

        mockMvc.perform(delete("/user/" + userId))
                .andExpect(status().isOk());
        verify(userService, times(1)).deleteUser(userId);
    }
}
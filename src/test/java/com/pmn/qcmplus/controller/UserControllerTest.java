package com.pmn.qcmplus.controller;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
/*
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    @Disabled
    @WithMockUser(username = "user", roles = {"USER"})
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
    @WithMockUser(username = "user", roles = {"USER"})
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
    @WithMockUser(username = "user", roles = {"USER"})
    void deleteUser() throws Exception {
        Integer userId = 1;

        when(userService.existsById(userId)).thenReturn(true);
        doNothing().when(userService).deleteUser(userId);

        mockMvc.perform(delete("/user/" + userId))
                .andExpect(status().isOk());
        verify(userService, times(1)).deleteUser(userId);
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void deleteUser_authenticated() throws Exception {
        Integer userId = 1;

        when(userService.existsById(userId)).thenReturn(true);
        doNothing().when(userService).deleteUser(userId);

        mockMvc.perform(delete("/user/" + userId))
                .andExpect(status().isOk());
        verify(userService, times(1)).deleteUser(userId);
    }

 */
}

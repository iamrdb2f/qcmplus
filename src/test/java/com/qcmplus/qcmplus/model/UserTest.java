package com.qcmplus.qcmplus.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserTest {

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
    }

    @Test
    void getUserId() {
        Integer idValue = 1;
        user.setUserId(idValue);

        assertEquals(idValue, user.getUserId());
    }

    @Test
    void getAndSetLastName() {
        String name = "Doe";
        user.setLastName(name);

        assertEquals(name, user.getLastName());
    }

    @Test
    void getAndSetFirstName() {
        String name = "John";
        user.setFirstName(name);

        assertEquals(name, user.getFirstName());
    }

    @Test
    void getAndSetEmail() {
        String email = "john.doe@example.com";
        user.setEmail(email);

        assertEquals(email, user.getEmail());
    }

    @Test
    void getAndSetUsername() {
        String userName = "john123";
        user.setUserName(userName);

        assertEquals(userName, user.getUserName());
    }

    @Test
    void getAndSetPassword() {
        String password = "password123";
        user.setPassword(password);

        assertEquals(password, user.getPassword());
    }

    @Test
    void getAndSetType() {
        String type = "admin";
        user.setType(type);

        assertEquals(type, user.getType());
    }
}
package com.qcmplus.qcmplus.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AdminTest {

    @Test
    void testAdmin() {
        Admin admin = new Admin();

        // set methods
        admin.setUserId(1);
        admin.setFirstName("John");
        admin.setLastName("Doe");
        admin.setEmail("john@doe.com");
        admin.setPassword("password");

        // get methods
        assertEquals((Integer) 1, admin.getUserId());
        assertEquals("John", admin.getFirstName());
        assertEquals("Doe", admin.getLastName());
        assertEquals("john@doe.com", admin.getEmail());
        assertEquals("password", admin.getPassword());

    }
}
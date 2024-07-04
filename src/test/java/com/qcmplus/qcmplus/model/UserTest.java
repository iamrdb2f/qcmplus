package com.qcmplus.qcmplus.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserTest {

    @Test
    void testUser() {
        User user = new User();

        // set methods
        user.setId(1);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@doe.com");
        user.setPassword("password");
        user.setPhoneNumber("123456789");
        user.setCompany("ABC Corp");
        user.setJobTitle("Manager");
        user.setRole(Role.valueOf("ADMIN")); // use uppercase "ADMIN"
        user.setGender(Gender.valueOf("MALE")); // use uppercase "MALE"

        // get methods
        assertEquals((Integer) 1, user.getId());
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("john@doe.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("ADMIN", user.getRole().toString()); // get the name of the enum value
        assertEquals("MALE", user.getGender().toString()); // get the name of the enum value
        assertEquals("123456789", user.getPhoneNumber());
        assertEquals("ABC Corp", user.getCompany());
        assertEquals("Manager", user.getJobTitle());
    }
}
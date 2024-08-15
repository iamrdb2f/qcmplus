package com.pmn.qcmplus.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private User user;
    private Role role;

    @BeforeEach
    void setUp() {
        role = new Role();
        role.setId(1);
        role.setRoleName("Admin");

        user = new User(
                1,
                "john.doe@example.com",
                "securePassword",
                "Doe",
                "John",
                "Male",
                "Tech Company",
                "Software Engineer",
                "1234567890",
                true,
                new Timestamp(System.currentTimeMillis()),
                role
        );
    }

    @Test
    void testUserGetters() {
        assertEquals(1, user.getId());
        assertEquals("john.doe@example.com", user.getEmail());
        assertEquals("securePassword", user.getPassword());
        assertEquals("Doe", user.getLastName());
        assertEquals("John", user.getFirstName());
        assertEquals("Male", user.getGender());
        assertEquals("Tech Company", user.getCompany());
        assertEquals("Software Engineer", user.getJobTitle());
        assertEquals("1234567890", user.getPhoneNumber());
        assertTrue(user.getIsActive());
        assertNotNull(user.getCreatedDate());
        assertEquals(role, user.getRole());
    }

    @Test
    void testUserSetters() {
        user.setId(2);
        assertEquals(2, user.getId());

        user.setEmail("jane.doe@example.com");
        assertEquals("jane.doe@example.com", user.getEmail());

        user.setPassword("newSecurePassword");
        assertEquals("newSecurePassword", user.getPassword());

        user.setLastName("Smith");
        assertEquals("Smith", user.getLastName());

        user.setFirstName("Jane");
        assertEquals("Jane", user.getFirstName());

        user.setGender("Female");
        assertEquals("Female", user.getGender());

        user.setCompany("New Company");
        assertEquals("New Company", user.getCompany());

        user.setJobTitle("Project Manager");
        assertEquals("Project Manager", user.getJobTitle());

        user.setPhoneNumber("0987654321");
        assertEquals("0987654321", user.getPhoneNumber());

        user.setIsActive(false);
        assertFalse(user.getIsActive());

        Timestamp newTimestamp = new Timestamp(System.currentTimeMillis());
        user.setCreatedDate(newTimestamp);
        assertEquals(newTimestamp, user.getCreatedDate());

        Role newRole = new Role();
        newRole.setId(2);
        newRole.setRoleName("User");
        user.setRole(newRole);
        assertEquals(newRole, user.getRole());
    }

    @Test
    void testNoArgsConstructor() {
        User user = new User();
        assertNull(user.getId());
        assertNull(user.getEmail());
        assertNull(user.getPassword());
        assertNull(user.getLastName());
        assertNull(user.getFirstName());
        assertNull(user.getGender());
        assertNull(user.getCompany());
        assertNull(user.getJobTitle());
        assertNull(user.getPhoneNumber());
        assertNull(user.getIsActive());
        assertNull(user.getCreatedDate());
        assertNull(user.getRole());
    }

    @Test
    void testAllArgsConstructor() {
        User user = new User(
                3,
                "mike.ross@example.com",
                "anotherPassword",
                "Ross",
                "Mike",
                "Male",
                "Legal Firm",
                "Associate",
                "1122334455",
                false,
                new Timestamp(System.currentTimeMillis()),
                role
        );

        assertEquals(3, user.getId());
        assertEquals("mike.ross@example.com", user.getEmail());
        assertEquals("anotherPassword", user.getPassword());
        assertEquals("Ross", user.getLastName());
        assertEquals("Mike", user.getFirstName());
        assertEquals("Male", user.getGender());
        assertEquals("Legal Firm", user.getCompany());
        assertEquals("Associate", user.getJobTitle());
        assertEquals("1122334455", user.getPhoneNumber());
        assertFalse(user.getIsActive());
        assertNotNull(user.getCreatedDate());
        assertEquals(role, user.getRole());
    }
}

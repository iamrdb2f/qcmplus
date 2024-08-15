package com.pmn.qcmplus.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RoleTest {

    private Role role;

    @BeforeEach
    void setUp() {
        role = new Role(1, "Admin");
    }

    @Test
    void testRoleGetters() {
        assertEquals(1, role.getId());
        assertEquals("Admin", role.getRoleName());
    }

    @Test
    void testRoleSetters() {
        role.setId(2);
        assertEquals(2, role.getId());

        role.setRoleName("User");
        assertEquals("User", role.getRoleName());
    }

    @Test
    void testNoArgsConstructor() {
        Role role = new Role();
        assertNull(role.getId());
        assertNull(role.getRoleName());
    }

    @Test
    void testAllArgsConstructor() {
        Role role = new Role(3, "Manager");

        assertEquals(3, role.getId());
        assertEquals("Manager", role.getRoleName());
    }
}

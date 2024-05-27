package com.qcmplus.qcmplus.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TeacherTest {

    @Test
    void testTeacher() {
        Teacher teacher = new Teacher();

        // set methods
        teacher.setUserId(1);
        teacher.setFirstName("Ada");
        teacher.setLastName("Lovelace");
        teacher.setEmail("ada@lovelace.com");
        teacher.setPassword("password");

        // get methods
        assertEquals((Integer) 1, teacher.getUserId());
        assertEquals("Ada", teacher.getFirstName());
        assertEquals("Lovelace", teacher.getLastName());
        assertEquals("ada@lovelace.com", teacher.getEmail());
        assertEquals("password", teacher.getPassword());

    }
}
package com.qcmplus.qcmplus.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TrainerTest {

    @Test
    void testTeacher() {
        Trainer trainer = new Trainer();

        // set methods
        trainer.setUserId(1);
        trainer.setFirstName("Ada");
        trainer.setLastName("Lovelace");
        trainer.setEmail("ada@lovelace.com");
        trainer.setPassword("password");

        // get methods
        assertEquals((Integer) 1, trainer.getUserId());
        assertEquals("Ada", trainer.getFirstName());
        assertEquals("Lovelace", trainer.getLastName());
        assertEquals("ada@lovelace.com", trainer.getEmail());
        assertEquals("password", trainer.getPassword());

    }
}
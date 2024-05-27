package com.qcmplus.qcmplus.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TraineeTest {

    @Test
    void testTrainee() {
        Trainee trainee = new Trainee();

        // set methods
        trainee.setUserId(1);
        trainee.setFirstName("Alan");
        trainee.setLastName("Turing");
        trainee.setEmail("alan@turing.com");
        trainee.setPassword("password");

        // get methods
        assertEquals((Integer) 1, trainee.getUserId());
        assertEquals("Alan", trainee.getFirstName());
        assertEquals("Turing", trainee.getLastName());
        assertEquals("alan@turing.com", trainee.getEmail());
        assertEquals("password", trainee.getPassword());

    }
}
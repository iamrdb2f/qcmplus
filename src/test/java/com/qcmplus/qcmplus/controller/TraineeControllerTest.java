package com.qcmplus.qcmplus.controller;


import com.qcmplus.qcmplus.model.Trainee;
import com.qcmplus.qcmplus.service.TraineeService;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class TraineeControllerTest {

    @InjectMocks
    TraineeController traineeController;

    @Mock
    TraineeService traineeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    private Trainee createTraineeObject() {
        return new Trainee();
    }

    @Test
    void getAllTrainees() {
        Trainee trainee = createTraineeObject();
        when(traineeService.getAllTrainees()).thenReturn(Collections.singletonList(trainee));
        ResponseEntity<List<Trainee>> response = traineeController.getAllTrainees();
        assertEquals(1, response.getBody().size());
        verify(traineeService, times(1)).getAllTrainees();
    }

    @Test
    void createTrainee() {
        Trainee trainee = createTraineeObject();
        when(traineeService.saveTrainee(any(Trainee.class))).thenReturn(trainee);
        ResponseEntity<Trainee> response = traineeController.createTrainee(trainee);
        assertEquals(trainee, response.getBody());
    }

    @Test
    void getTraineeById() {
        Trainee trainee = createTraineeObject();
        Long id = 1L;
        when(traineeService.getTraineeById(id)).thenReturn(Optional.of(trainee));
        ResponseEntity<Optional<Trainee>> response = traineeController.getTraineeById(id);
        assertEquals(trainee, response.getBody().get());
    }

    @Test
    @DisplayName("Tests updating of a trainee")
    void updateTraineeTest() {
        // Introducing constants for readability
        final Long TRAINEE_ID = 1L;
        final String NEW_FIRST_NAME = "New Name";

        Trainee updatedTrainee = createTraineeObject();
        updatedTrainee.setFirstName(NEW_FIRST_NAME);

        Trainee existingTrainee = new Trainee();
        existingTrainee.setFirstName("Old Name");

        given(traineeService.findById(anyLong())).willReturn(Optional.of(existingTrainee));
        given(traineeService.save(existingTrainee)).willReturn(updatedTrainee);

        ResponseEntity<Trainee> response = traineeController.updateTrainee(TRAINEE_ID, updatedTrainee);

        Assertions.assertAll(
                () -> Assertions.assertNotNull(response.getBody(), "Response body should not be null"),
                () -> assertEquals(HttpStatus.OK, response.getStatusCode(), "Status code should be OK"),
                () -> assertEquals(updatedTrainee.getFirstName(), Objects.requireNonNull(response.getBody()).getFirstName(), "First names should match"),
                () -> assertEquals(existingTrainee.getLastName(), Objects.requireNonNull(response.getBody()).getLastName(), "Last names should match"),
                () -> assertEquals(existingTrainee.getEmail(), Objects.requireNonNull(response.getBody()).getEmail(), "Email addresses should match")
                // Add more checks here as needed
        );

        verify(traineeService, times(1)).save(any(Trainee.class));
    }

    @Test
    void deleteTrainee() {
        Long id = 1L;
        doNothing().when(traineeService).deleteTrainee(anyLong());
        ResponseEntity<String> response = traineeController.deleteTrainee(id);
        assertEquals("Trainee with id " + id + " deleted successfully", response.getBody());
    }
}
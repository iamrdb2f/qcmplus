package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.exception.TraineeEmailAlreadyInUseException;
import com.qcmplus.qcmplus.exception.TraineeNotFoundException;
import com.qcmplus.qcmplus.model.Trainee;
import com.qcmplus.qcmplus.service.TraineeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TraineeControllerTest {

    @InjectMocks
    private TraineeController traineeController;

    @Mock
    private TraineeService traineeService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllTrainees() {
        List<Trainee> trainees = Arrays.asList(new Trainee(), new Trainee());
        when(traineeService.getAllTrainees()).thenReturn(trainees);

        ResponseEntity<List<Trainee>> response = traineeController.getAllTrainees();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, Objects.requireNonNull(response.getBody()).size());
        verify(traineeService, times(1)).getAllTrainees();
    }

    @Test
    public void testGetTraineeById() {
        Trainee trainee = new Trainee();
        when(traineeService.getTraineeById(1L)).thenReturn(Optional.of(trainee));

        ResponseEntity<Trainee> response = traineeController.getTraineeById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(trainee, response.getBody());
        verify(traineeService, times(1)).getTraineeById(1L);
    }

    @Test
    public void testGetTraineeById_NotFound() {
        when(traineeService.getTraineeById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Trainee> response = traineeController.getTraineeById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(traineeService, times(1)).getTraineeById(1L);
    }

    @Test
    public void testCreateTrainee() {
        Trainee trainee = new Trainee();
        when(traineeService.saveTrainee(any(Trainee.class))).thenReturn(trainee);

        ResponseEntity<Trainee> response = traineeController.createTrainee(trainee);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(trainee, response.getBody());
        verify(traineeService, times(1)).saveTrainee(trainee);
    }

    @Test
    public void testCreateTrainee_EmailAlreadyInUse() {
        Trainee trainee = new Trainee();
        doThrow(new TraineeEmailAlreadyInUseException("Email already in use")).when(traineeService).saveTrainee(any(Trainee.class));

        ResponseEntity<Trainee> response = traineeController.createTrainee(trainee);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        verify(traineeService, times(1)).saveTrainee(trainee);
    }

    @Test
    public void testUpdateTrainee() {
        Trainee trainee = new Trainee();
        when(traineeService.updateTrainee(anyLong(), any(Trainee.class))).thenReturn(trainee);

        ResponseEntity<?> response = traineeController.updateTrainee(1L, trainee);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(trainee, response.getBody());
        verify(traineeService, times(1)).updateTrainee(1L, trainee);
    }

    @Test
    public void testUpdateTrainee_EmailAlreadyInUse() {
        Trainee trainee = new Trainee();
        doThrow(new TraineeEmailAlreadyInUseException("Email already in use")).when(traineeService).updateTrainee(anyLong(), any(Trainee.class));

        ResponseEntity<?> response = traineeController.updateTrainee(1L, trainee);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Email already in use", response.getBody());
        verify(traineeService, times(1)).updateTrainee(1L, trainee);
    }

    @Test
    public void testDeleteTrainee() {
        when(traineeService.existsById(1L)).thenReturn(true);
        doNothing().when(traineeService).deleteTrainee(1L);

        ResponseEntity<String> response = traineeController.deleteTrainee(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(Objects.requireNonNull(response.getBody()).contains("Trainee with ID 1 deleted successfully"));
        verify(traineeService, times(1)).existsById(1L);
        verify(traineeService, times(1)).deleteTrainee(1L);
    }

    @Test
    public void testDeleteTrainee_NotFound() {
        when(traineeService.existsById(1L)).thenReturn(false);

        try {
            traineeController.deleteTrainee(1L);
        } catch (TraineeNotFoundException e) {
            assertEquals("Trainee with ID 1 not found.", e.getMessage());
        }

        verify(traineeService, times(1)).existsById(1L);
        verify(traineeService, times(0)).deleteTrainee(1L);
    }
}

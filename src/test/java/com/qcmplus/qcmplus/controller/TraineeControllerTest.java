package com.qcmplus.qcmplus.controller;


import com.qcmplus.qcmplus.model.Trainee;
import com.qcmplus.qcmplus.service.TraineeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class TraineeControllerTest {

    @InjectMocks
    TraineeController traineeController;

    @Mock
    TraineeService traineeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTrainees() {
        Trainee trainee = new Trainee();
        when(traineeService.getAllTrainees()).thenReturn(Collections.singletonList(trainee));
        ResponseEntity<List<Trainee>> response = traineeController.getAllTrainees();
        assertEquals(1, response.getBody().size());
        verify(traineeService, times(1)).getAllTrainees();
    }

    @Test
    void createTrainee() {
        Trainee trainee = new Trainee();
        when(traineeService.saveTrainee(any(Trainee.class))).thenReturn(trainee);
        ResponseEntity<Trainee> response = traineeController.createTrainee(trainee);
        assertEquals(trainee, response.getBody());
    }

    @Test
    void getTraineeById() {
        Trainee trainee = new Trainee();
        Long id = 1L;
        when(traineeService.getTraineeById(id)).thenReturn(Optional.of(trainee));
        ResponseEntity<Optional<Trainee>> response = traineeController.getTraineeById(id);
        assertEquals(trainee, response.getBody().get());
    }

    @Test
    void updateTrainee() throws Exception {
        Trainee trainee = new Trainee();
        Long id = 1L;
        when(traineeService.updateTrainee(anyLong(), any(Trainee.class))).thenReturn(trainee);
        ResponseEntity<Trainee> response = traineeController.updateTrainee(id, trainee);
        assertEquals(trainee, response.getBody());
    }

    @Test
    void deleteTrainee() {
        Long id = 1L;
        doNothing().when(traineeService).deleteTrainee(anyLong());
        ResponseEntity<String> response = traineeController.deleteTrainee(id);
        assertEquals("Trainee with id " + id + " deleted successfully", response.getBody());
    }
}
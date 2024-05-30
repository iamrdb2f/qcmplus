package com.qcmplus.qcmplus.controller;


import com.qcmplus.qcmplus.model.Trainer;
import com.qcmplus.qcmplus.service.TrainerService;
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

class TrainerControllerTest {

    @InjectMocks
    TrainerController trainerController;

    @Mock
    TrainerService trainerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTrainers() {
        Trainer trainer = new Trainer();
        when(trainerService.getAllTrainers()).thenReturn(Collections.singletonList(trainer));
        ResponseEntity<List<Trainer>> response = trainerController.getAllTrainers();
        assertEquals(1, response.getBody().size());
        verify(trainerService, times(1)).getAllTrainers();
    }

    @Test
    void createTrainer() {
        Trainer trainer = new Trainer();
        when(trainerService.saveTrainer(any(Trainer.class))).thenReturn(trainer);
        ResponseEntity<Trainer> response = trainerController.createTrainer(trainer);
        assertEquals(trainer, response.getBody());
    }

    @Test
    void getTrainerById() {
        Trainer trainer = new Trainer();
        Long id = 1L;
        when(trainerService.getTrainerById(id)).thenReturn(Optional.of(trainer));
        ResponseEntity<Optional<Trainer>> response = trainerController.getTrainerById(id);
        assertEquals(trainer, response.getBody().get());
    }

    @Test
    void updateTrainer() throws Exception {
        Trainer trainer = new Trainer();
        Long id = 1L;
        when(trainerService.updateTrainer(anyLong(), any(Trainer.class))).thenReturn(trainer);
        ResponseEntity<Trainer> response = trainerController.updateTrainer(id, trainer);
        assertEquals(trainer, response.getBody());
    }

    @Test
    void deleteTrainer() {
        Long id = 1L;
        doNothing().when(trainerService).deleteTrainer(anyLong());
        ResponseEntity<String> response = trainerController.deleteTrainer(id);
        assertEquals("Trainer with id " + id + " deleted successfully", response.getBody());
    }
}
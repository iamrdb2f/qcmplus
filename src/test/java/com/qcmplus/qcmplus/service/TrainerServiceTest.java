package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.Trainer;
import com.qcmplus.qcmplus.repository.TrainerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.doNothing;


public class TrainerServiceTest {

    @InjectMocks
    private TrainerService trainerService;

    @Mock
    private TrainerRepository trainerRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveTrainer() {
        Trainer trainer = new Trainer();
        when(trainerRepository.save(any())).thenReturn(trainer);
        Trainer result = trainerService.saveTrainer(trainer);
        assertEquals(trainer, result);
        verify(trainerRepository, times(1)).save(trainer);
    }

    @Test
    public void testGetAllTrainers() {
        List<Trainer> trainerList = new ArrayList<>();
        when(trainerRepository.findAll()).thenReturn(trainerList);
        List<Trainer> result = trainerService.getAllTrainers();
        assertEquals(trainerList, result);
        verify(trainerRepository, times(1)).findAll();
    }

    @Test
    public void testGetTrainerById() {
        Trainer trainer = new Trainer();
        when(trainerRepository.findById(anyLong())).thenReturn(Optional.of(trainer));
        Optional<Trainer> result = trainerService.getTrainerById(1L);
        assert (result.isPresent());
        verify(trainerRepository, times(1)).findById(1L);
    }

    @Test
    public void testUpdateTrainer() throws Exception {
        Trainer trainer = new Trainer();
        when(trainerRepository.findById(anyLong())).thenReturn(Optional.of(trainer));
        when(trainerRepository.save(any())).thenReturn(trainer);
        Trainer result = trainerService.updateTrainer(1L, trainer);
        assertEquals(trainer, result);
        verify(trainerRepository, times(1)).save(trainer);
        verify(trainerRepository, times(1)).findById(1L);
    }

    @Test
    public void testDeleteTrainer() {
        doNothing().when(trainerRepository).deleteById(anyLong());
        trainerService.deleteTrainer(1L);
        verify(trainerRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testUpdateTrainerNotFound() {
        Trainer trainer = new Trainer();
        when(trainerRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(Exception.class, () -> trainerService.updateTrainer(1L, trainer));
        verify(trainerRepository, times(1)).findById(1L);
    }

}
package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.Trainee;
import com.qcmplus.qcmplus.repository.TraineeRepository;
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
import static org.mockito.Mockito.*;


public class TraineeServiceTest {

    @InjectMocks
    private TraineeService traineeService;

    @Mock
    private TraineeRepository traineeRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveTrainee() {
        Trainee trainee = new Trainee();
        when(traineeRepository.save(any())).thenReturn(trainee);
        Trainee result = traineeService.saveTrainee(trainee);
        assertEquals(trainee, result);
        verify(traineeRepository, times(1)).save(trainee);
    }

    @Test
    public void testGetAllTrainees() {
        List<Trainee> traineeList = new ArrayList<>();
        when(traineeRepository.findAll()).thenReturn(traineeList);
        List<Trainee> result = traineeService.getAllTrainees();
        assertEquals(traineeList, result);
        verify(traineeRepository, times(1)).findAll();
    }

    @Test
    public void testGetTraineeById() {
        Trainee trainee = new Trainee();
        when(traineeRepository.findById(anyLong())).thenReturn(Optional.of(trainee));
        Optional<Trainee> result = traineeService.getTraineeById(1L);
        assert (result.isPresent());
        verify(traineeRepository, times(1)).findById(1L);
    }

    @Test
    public void testUpdateTrainee() throws Exception {
        Trainee trainee = new Trainee();
        when(traineeRepository.findById(anyLong())).thenReturn(Optional.of(trainee));
        when(traineeRepository.save(any())).thenReturn(trainee);
        Trainee result = traineeService.updateTrainee(1L, trainee);
        assertEquals(trainee, result);
        verify(traineeRepository, times(1)).save(trainee);
        verify(traineeRepository, times(1)).findById(1L);
    }

    @Test
    public void testDeleteTrainee() {
        doNothing().when(traineeRepository).deleteById(anyLong());
        traineeService.deleteTrainee(1L);
        verify(traineeRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testUpdateTraineeNotFound() {
        Trainee trainee = new Trainee();
        when(traineeRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(Exception.class, () -> {
            traineeService.updateTrainee(1L, trainee);
        });
        verify(traineeRepository, times(1)).findById(1L);
    }

}
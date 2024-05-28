package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.Admin;
import com.qcmplus.qcmplus.model.Teacher;
import com.qcmplus.qcmplus.repository.TeacherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class TeacherServiceTest {

    @InjectMocks
    private TeacherService teacherService;

    @Mock
    private TeacherRepository teacherRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllTeachers() {
        List<Teacher> teacherList = new ArrayList<>();
        when(teacherRepository.findAll()).thenReturn(teacherList);
        List<Teacher> result = teacherService.getAllTeachers();
        assertEquals(teacherList, result);
        verify(teacherRepository, times(1)).findAll();
    }

    @Test
    public void testGetTeacherById() {
        Teacher teacher = new Teacher();
        when(teacherRepository.findById(anyLong())).thenReturn(Optional.of(teacher));
        Optional<Teacher> result = teacherService.getTeacherById(1L);
        assertTrue(result.isPresent());
        verify(teacherRepository, times(1)).findById(anyLong());
    }

    @Test
    public void testSaveTeacher() {
        Teacher teacher = new Teacher();
        when(teacherRepository.save(any())).thenReturn(teacher);
        Teacher result = teacherService.saveTeacher(teacher);
        assertEquals(teacher, result);
        verify(teacherRepository, times(1)).save(any(Teacher.class));
    }

    @Test
    public void testUpdateExistingTeacher() throws Exception {
        Teacher teacher = new Teacher();
        when(teacherRepository.findById(anyLong())).thenReturn(Optional.of(teacher));
        when(teacherRepository.findByEmailAndUserIdNot(anyString(), (int) anyLong())).thenReturn(Optional.empty());
        when(teacherRepository.save(any())).thenReturn(teacher);
        Teacher result = teacherService.updateTeacher(1L, teacher);
        assertEquals(teacher, result);
        verify(teacherRepository, times(1)).findById(anyLong());
        verify(teacherRepository, times(1)).save(any(Teacher.class));
    }

    @Test
    public void testUpdateTeacherNotFound() {
        Teacher teacher = new Teacher();
        when(teacherRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(Exception.class, () -> teacherService.updateTeacher(1L, teacher));
        verify(teacherRepository, times(1)).findById(anyLong());
    }

    @Test
    public void testDeleteTeacher() {
        doNothing().when(teacherRepository).deleteById(anyLong());
        teacherService.deleteTeacher(1L);
        verify(teacherRepository, times(1)).deleteById(anyLong());
    }

    @Test
    public void testVerifyEmailInUse() throws Exception {
        Teacher teacher = new Teacher();
        teacher.setEmail("test@example.com");
        teacher.setUserId(1);
        when(teacherRepository.findByEmailAndUserIdNot(teacher.getEmail(), teacher.getUserId())).thenReturn(Optional.empty());
        teacherService.verifyEmail(teacher); // expect not to throw
    }
}
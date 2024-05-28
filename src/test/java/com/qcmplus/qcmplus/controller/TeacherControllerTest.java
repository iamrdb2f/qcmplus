package com.qcmplus.qcmplus.controller;

import com.qcmplus.qcmplus.model.Teacher;
import com.qcmplus.qcmplus.service.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class TeacherControllerTest {

    @InjectMocks
    TeacherController teacherController;

    @Mock
    TeacherService teacherService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTeachers() {
        Teacher teacher1 = new Teacher();
        Teacher teacher2 = new Teacher();
        when(teacherService.getAllTeachers()).thenReturn(Arrays.asList(teacher1, teacher2));

        List<Teacher> allTeachers = teacherController.getAllTeachers();

        assertEquals(2, allTeachers.size());
        verify(teacherService, times(1)).getAllTeachers();
    }

    @Test
    void testGetTeacherById() {
        Teacher teacher = new Teacher();
        when(teacherService.getTeacherById(1L)).thenReturn(Optional.of(teacher));

        ResponseEntity<Teacher> responseEntity = teacherController.getTeacherById(1L);

        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(teacher, responseEntity.getBody());
        verify(teacherService, times(1)).getTeacherById(1L);
    }

    @Test
    void testCreateTeacher() {
        Teacher teacher = new Teacher();
        when(teacherService.saveTeacher(any(Teacher.class))).thenReturn(teacher);

        ResponseEntity<Teacher> responseEntity = teacherController.createTeacher(new Teacher());

        assertEquals(201, responseEntity.getStatusCodeValue());
        assertEquals(teacher, responseEntity.getBody());
        verify(teacherService, times(1)).saveTeacher(any(Teacher.class));
    }

    @Test
    void testUpdateTeacher() throws Exception {
        Teacher teacher = new Teacher();
        when(teacherService.updateTeacher(anyLong(), any(Teacher.class))).thenReturn(teacher);

        ResponseEntity<Teacher> responseEntity = teacherController.updateTeacher(1L, new Teacher());

        assertEquals(200, responseEntity.getStatusCodeValue());
        assertEquals(teacher, responseEntity.getBody());
        verify(teacherService, times(1)).updateTeacher(anyLong(), any(Teacher.class));
    }

    @Test
    void testDeleteTeacher() {
        doNothing().when(teacherService).deleteTeacher(1L);

        ResponseEntity<String> responseEntity = teacherController.deleteTeacher(1L);

        assertEquals(200, responseEntity.getStatusCodeValue());
        verify(teacherService, times(1)).deleteTeacher(1L);
    }
}
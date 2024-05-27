package com.qcmplus.qcmplus.service;

import com.qcmplus.qcmplus.model.Teacher;
import com.qcmplus.qcmplus.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Optional<Teacher> getTeacherById(Long id) {
        return teacherRepository.findById(id);
    }

    public Teacher saveTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public Teacher updateTeacher(Long id, Teacher teacherDetails) throws Exception {
        Optional<Teacher> optionalTeacher = teacherRepository.findById(id);
        if (optionalTeacher.isPresent()) {
            Teacher teacher = optionalTeacher.get();
            verifyEmail(teacher);
            teacher.setLastName(teacherDetails.getLastName());
            teacher.setFirstName(teacherDetails.getFirstName());
            teacher.setEmail(teacherDetails.getEmail());
            teacher.setPassword(teacherDetails.getPassword());
            return teacherRepository.save(teacher);
        } else {
            throw new Exception("Teacher not found with id " + id);
        }
    }

    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }

    void verifyEmail(Teacher teacher) throws Exception {
        Optional<Teacher> existingTeacher = teacherRepository.findByEmailAndUserIdNot(teacher.getEmail(), teacher.getUserId());
        if (existingTeacher.isPresent()) {
            throw new Exception("Email " + teacher.getEmail() + " is already in use by another user.");
        }
    }
}

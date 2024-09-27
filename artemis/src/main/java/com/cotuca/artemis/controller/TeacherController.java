package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Classroom;
import com.cotuca.artemis.model.ClassroomRequest;
import com.cotuca.artemis.model.Teacher;
import com.cotuca.artemis.model.TeacherData;
import com.cotuca.artemis.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("teachers")
@RestController
public class TeacherController {

    @Autowired
    private TeacherRepository repository;

    @GetMapping
    public List<TeacherData> getAll()
    {
        List<Teacher> teachers = this.repository.findAll();

        List<TeacherData> list = teachers.stream().map(teacher -> new TeacherData(teacher.getId(), teacher.getEmail(), teacher.getUsername(), teacher.getPassword(), teacher.getSchool(), teacher.getClassrooms() != null? teacher.getClassrooms().stream().map(Classroom::getId).collect(Collectors.toList()) : null)).toList();

        return list;
    }

    @GetMapping("/{id}")
    public TeacherData getTeacherById(@PathVariable Integer id){
        Teacher teacher = repository.findById(id).orElse(null);

        return new TeacherData(teacher.getId(), teacher.getEmail(), teacher.getUsername(), teacher.getPassword(), teacher.getSchool(), teacher.getClassrooms() != null? teacher.getClassrooms().stream().map(Classroom::getId).collect(Collectors.toList()) : null);
    }

    @GetMapping("/getByEmail/{email}")
    public TeacherData getTeacherByEmail(@PathVariable String email){
        Teacher teacher = repository.findByEmail(email).orElse(null);

        return new TeacherData(teacher.getId(), teacher.getEmail(), teacher.getUsername(), teacher.getPassword(), teacher.getSchool(), teacher.getClassrooms() != null? teacher.getClassrooms().stream().map(Classroom::getId).collect(Collectors.toList()) : null);
    }

    @PostMapping
    public Teacher createTeacher(@RequestBody Teacher teacher){
        return repository.save(teacher);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable Integer id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable Integer id, @RequestBody Teacher updatedTeacher) {
        Optional<Teacher> optionalTeacher = repository.findById(id);
        if (optionalTeacher.isPresent()) {
            Teacher existingTeacher = optionalTeacher.get();

            existingTeacher.setEmail(updatedTeacher.getEmail());
            existingTeacher.setUsername(updatedTeacher.getUsername());
            existingTeacher.setPassword(updatedTeacher.getPassword());
            existingTeacher.setSchool(updatedTeacher.getSchool());

            Teacher savedTeacher = repository.save(existingTeacher);
            return ResponseEntity.ok(savedTeacher);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

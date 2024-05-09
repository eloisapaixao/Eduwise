package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Student;
import com.cotuca.artemis.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("students")
@RestController
public class StudentController {
    @Autowired
    private StudentRepository repository;

    @GetMapping
    public List<Student> getAll(){return repository.findAll();}

    @GetMapping("/{id}")
    public Optional<Student> getStudentById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student){
        return repository.save(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Integer id){
        repository.deleteById(id);
    }
}

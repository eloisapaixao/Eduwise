package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Student;
import com.cotuca.artemis.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("students")
@RestController
public class StudentController {
    @Autowired
    private StudentRepository repository;

    @GetMapping
    public List<Student> getAll(){return repository.findAll();}
}

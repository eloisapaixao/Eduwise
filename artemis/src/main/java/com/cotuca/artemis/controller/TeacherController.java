package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Teacher;
import com.cotuca.artemis.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/teachers")
@RestController
public class TeacherController {

    @Autowired
    private TeacherRepository repository;

    @GetMapping
    public List<Teacher> getAll() {
        return repository.findAll();
    }
}

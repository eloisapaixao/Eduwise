package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Classroom;
import com.cotuca.artemis.repositories.ClassroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("classrooms")
@RestController
public class ClassroomController {
    @Autowired
    private ClassroomRepository repository;

    @GetMapping
    public List<Classroom> getAll(){return repository.findAll();}
}

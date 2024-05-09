package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Subject;
import com.cotuca.artemis.repositories.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("subjects")
@RestController
public class SubjectController {
    @Autowired
    private SubjectRepository repository;

    @GetMapping
    public List<Subject> getAll(){return repository.findAll();}
}

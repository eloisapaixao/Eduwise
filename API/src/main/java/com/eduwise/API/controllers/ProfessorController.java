package com.eduwise.API.controllers;

import com.eduwise.API.model.Professor;
import com.eduwise.API.repositories.ProfessorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping(value = "/professores")
public class ProfessorController {

    private ProfessorRepository repository;

    @GetMapping
    public List<Professor> getAll()
    {
        return repository.findAll();
    }
}

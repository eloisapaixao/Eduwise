package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Classroom;
import com.cotuca.artemis.repositories.ClassroomRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("classrooms")
@RestController
public class ClassroomController {
    @Autowired
    private ClassroomRepository repository;

    @GetMapping
    public List<Classroom> getAll(){return repository.findAll();}

    @GetMapping("/{id}")
    public Optional<Classroom> getClassroomById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @PostMapping
    public Classroom createClassroom(@RequestBody Classroom classroom){
        return repository.save(classroom);
    }

    @DeleteMapping("/{id}")
    public void deleteClassroom(@PathVariable Integer id){
        repository.deleteById(id);
    }
}

package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Teacher;
import com.cotuca.artemis.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("teachers")
@RestController
public class TeacherController {

    @Autowired
    private TeacherRepository repository;

    @GetMapping
    public List<Teacher> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Teacher> getTeacherById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @PostMapping
    public Teacher createTeacher(@RequestBody Teacher teacher){
        return repository.save(teacher);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable Integer id){
        repository.deleteById(id);
    }
}

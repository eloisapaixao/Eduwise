package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Teacher;
import com.cotuca.artemis.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/getByEmail/{email}")
    public Optional<Teacher> getTeacherByEmail(@PathVariable String email){
        return repository.findByEmail(email);
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

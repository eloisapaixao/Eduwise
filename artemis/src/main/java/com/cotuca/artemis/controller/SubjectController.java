package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Subject;
import com.cotuca.artemis.repositories.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("subjects")
@RestController
public class SubjectController {
    @Autowired
    private SubjectRepository repository;

    @GetMapping
    public List<Subject> getAll(){return repository.findAll();}

    @GetMapping("/{id}")
    public Optional<Subject> getSubjectById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @PostMapping
    public Subject createSubject(@RequestBody Subject subject){
        return repository.save(subject);
    }

    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Integer id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Integer id, @RequestBody Subject updatedSubject){
        Optional<Subject> optionalSubject = repository.findById(id);
        if(optionalSubject.isPresent()){
            Subject existingSubject = optionalSubject.get();

            existingSubject.setName(updatedSubject.getName());

            Subject savedSubject = repository.save(existingSubject);
            return ResponseEntity.ok(savedSubject);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

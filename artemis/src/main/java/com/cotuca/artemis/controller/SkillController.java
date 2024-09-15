package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Skill;
import com.cotuca.artemis.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("skills")
@RestController
public class SkillController {
    @Autowired
    private SkillRepository repository;

    @GetMapping
    public List<Skill> getAll(){return repository.findAll();}

    @GetMapping("/{id}")
    public Optional<Skill> getSkillById(@PathVariable String id){
        return repository.findById(id);
    }

    @PostMapping
    public Skill createSkill(@RequestBody Skill skill){
        return repository.save(skill);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable String id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable String id, @RequestBody Skill updatedSkill){
        Optional<Skill> optionalSkill = repository.findById(id);
        if(optionalSkill.isPresent()){
            Skill existingSkill = optionalSkill.get();

            existingSkill.setName(updatedSkill.getName());

            Skill savedSkill = repository.save(existingSkill);
            return ResponseEntity.ok(savedSkill);
        } else{
            return ResponseEntity.notFound().build();
        }
    }
}

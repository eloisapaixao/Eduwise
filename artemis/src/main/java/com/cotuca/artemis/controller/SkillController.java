package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Skill;
import com.cotuca.artemis.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("skills")
@RestController
public class SkillController {
    @Autowired
    private SkillRepository repository;

    @GetMapping
    public List<Skill> getAll(){return repository.findAll();}
}

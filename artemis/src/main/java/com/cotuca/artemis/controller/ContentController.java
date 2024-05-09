package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Content;
import com.cotuca.artemis.repositories.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("contents")
@RestController
public class ContentController {
    @Autowired
    private ContentRepository repository;

    @GetMapping
    public List<Content> getAll(){return repository.findAll();}

    @GetMapping("/{id}")
    public Optional<Content> getContentById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @PostMapping
    public Content createContent(@RequestBody Content content){
        return repository.save(content);
    }

    @DeleteMapping("/{id}")
    public void deleteContent(@PathVariable Integer id){
        repository.deleteById(id);
    }
}

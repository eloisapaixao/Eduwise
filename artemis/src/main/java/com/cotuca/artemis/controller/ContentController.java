package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Content;
import com.cotuca.artemis.repositories.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("contents")
@RestController
public class ContentController {
    @Autowired
    private ContentRepository repository;

    @GetMapping
    public List<Content> getAll(){return repository.findAll();}
}

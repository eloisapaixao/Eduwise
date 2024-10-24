package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.*;
import com.cotuca.artemis.repositories.ContentRepository;
import com.cotuca.artemis.repositories.SubcontentRepository;
import com.cotuca.artemis.repositories.SubjectRepository;
import com.cotuca.artemis.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("subcontents")
@RestController
public class SubcontentController {
    @Autowired
    private SubcontentRepository repository;
    @Autowired
    private ContentRepository contentRepository;

    @GetMapping
    public List<Subcontent> getAll(){return repository.findAll();}

    @GetMapping("/{id}")
    public Optional<Subcontent> getSubcontentById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @GetMapping("/getByContent/{contentId}")
    public List<SubcontentData> getSubcontentByContent(@PathVariable Integer contentId) {
        Optional<Content> content = contentRepository.findById(contentId);
        if (content.isPresent()) {
            List<Subcontent> subcontents = repository.findByContent(content.get());
            return subcontents.stream()
                    .map(subcontent -> new SubcontentData(subcontent.getId(), subcontent.getName(), subcontent.getContent().getId()))
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }
}

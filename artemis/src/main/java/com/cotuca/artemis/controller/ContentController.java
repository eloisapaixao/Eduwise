package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.*;
import com.cotuca.artemis.repositories.ContentRepository;
import com.cotuca.artemis.repositories.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("contents")
@RestController
public class ContentController {
    @Autowired
    private ContentRepository repository;
    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping
    public List<Content> getAll(){return repository.findAll();}

    @GetMapping("/{id}")
    public Optional<Content> getContentById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @GetMapping("/getBySubject/{subjectId}")
    public ContentData getContentBySubject(@PathVariable int subjectId){
        Optional<Subject> subject = subjectRepository.findById(subjectId);
        Content content = repository.findBySubject(subject.get()).orElse(null);

        return new ContentData(content.getId(), content.getName(), content.getLevel(), content.getSubject().getId());
    }

    @PostMapping
    public Content createContent(@RequestBody Content content){
        return repository.save(content);
    }

    @DeleteMapping("/{id}")
    public void deleteContent(@PathVariable Integer id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Content> updateContent(@PathVariable Integer id, @RequestBody Content updatedContent){
        Optional<Content> optionalContent = repository.findById(id);
        if(optionalContent.isPresent()){
            Content existingContent = optionalContent.get();

            existingContent.setName(updatedContent.getName());
            existingContent.setSubject(updatedContent.getSubject());

            Content savedContent = repository.save(existingContent);
            return ResponseEntity.ok(savedContent);
        } else{
            return ResponseEntity.notFound().build();
        }
    }
}

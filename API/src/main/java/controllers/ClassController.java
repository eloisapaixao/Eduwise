package controllers;

import entities.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repositories.ClassRepository;
import repositories.StudentRepository;

import java.util.List;

@RestController
@RequestMapping
public class ClassController {
    @Autowired
    private ClassRepository classRepository;

    @GetMapping
    public List<Class> getAll() {
        return classRepository.findAll();
    }

    @GetMapping(value="/{id}")
    public Class findAll(@PathVariable Integer id)
    {
        return this.classRepository.findById(id).get();
    }

    @PostMapping
    public Class insert (@RequestBody Class classs)
    {
        return this.classRepository.save(classs);
    }
}

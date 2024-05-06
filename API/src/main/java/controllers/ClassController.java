package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import repositories.ClassRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/classes")
public class ClassController {
    @Autowired
    private ClassRepository classRepository;

    @GetMapping
    public List<Class> getAll(){return classRepository.findAll();}

}

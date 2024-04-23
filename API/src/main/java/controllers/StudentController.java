package controllers;

import entities.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import repositories.StudentRepository;

import java.util.List;

@RequestMapping("students")
@RestController
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @GetMapping(value="/{id}")
    public Student findAll(@PathVariable Integer id)
    {
        return this.studentRepository.findById(id).get();
    }

    @PostMapping
    public Student insert (@RequestBody Student student)
    {
        return this.studentRepository.save(student);
    }
}
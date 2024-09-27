package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Classroom;
import com.cotuca.artemis.model.Student;
import com.cotuca.artemis.model.StudentData;
import com.cotuca.artemis.model.Subject;
import com.cotuca.artemis.repositories.ClassroomRepository;
import com.cotuca.artemis.repositories.StudentRepository;
import com.cotuca.artemis.repositories.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("students")
@RestController
public class StudentController {
    @Autowired
    private StudentRepository repository;
    @Autowired
    private ClassroomRepository classroomRepository;
    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping
    public List<Student> getAll(){return repository.findAll();}

    @GetMapping("/{id}")
    public Optional<Student> getStudentById(@PathVariable Integer id){
        return repository.findById(id);
    }

    /*@PostMapping
    public StudentData createStudent(@RequestBody StudentData student){
        Classroom classroom = classroomRepository.findById(student.classrromId()).orElse(null);

        for(Integer s : student.subjects()) {
            Subject subject = subjectRepository.findById(s).orElse(null);
        }

        Student aluno = new Student(student.id(), student.name(), student.birthday(), student.email(), classroom, student.subjects() != null? student.subjects().stream().map(Subject::getId).collect(Collectors.toList()) : null);
    }*/

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Integer id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Integer id, @RequestBody Student updatedStudent){
        Optional<Student> optionalStudent = repository.findById(id);
        if(optionalStudent.isPresent()){
            Student existingStudent = optionalStudent.get();

            existingStudent.setName(updatedStudent.getName());
            existingStudent.setEmail(updatedStudent.getEmail());
            existingStudent.setBirthday(updatedStudent.getBirthday());
            existingStudent.setClassroom(updatedStudent.getClassroom());

            Student savedStudent = repository.save(existingStudent);
            return ResponseEntity.ok(savedStudent);
        } else{
            return ResponseEntity.notFound().build();
        }
    }
}

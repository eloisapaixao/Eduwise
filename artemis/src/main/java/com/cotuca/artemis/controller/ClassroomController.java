package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.Classroom;
import com.cotuca.artemis.model.ClassroomData;
import com.cotuca.artemis.model.Teacher;
import com.cotuca.artemis.repositories.ClassroomRepository;
import com.cotuca.artemis.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("classrooms")
@RestController
public class ClassroomController {
    @Autowired
    private ClassroomRepository repository;
    @Autowired
    private TeacherRepository repositoryTeacher;

    @GetMapping
    public List<Classroom> getAll() {return repository.findAll();}

    @GetMapping("/{id}")
    public Optional<Classroom> getClassroomById(@PathVariable Integer id){
        return repository.findById(id);
    }

    @GetMapping("/prof/{id}")
    public List<Classroom> getAllByTeacherId(@PathVariable Integer idProfessor) {
        return repository.getClassroomByTeacherId(idProfessor);
    }

    @PostMapping
    public Classroom createClassroom(@RequestBody ClassroomData classroom){
        System.out.println(classroom.teacher());
        Teacher teacher = repositoryTeacher.findById(classroom.teacher()).orElse(null);
        Classroom sala = new Classroom(0, classroom.name(), classroom.level(), teacher);
        return repository.save(sala);
    }

    @DeleteMapping("/{id}")
    public void deleteClassroom(@PathVariable Integer id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Classroom> updateClassroom(@PathVariable Integer id, @RequestBody Classroom updatedClassroom){
        Optional<Classroom> optionalClassroom = repository.findById(id);
        if (optionalClassroom.isPresent()){
            Classroom existingClassroom = optionalClassroom.get();

            existingClassroom.setName(updatedClassroom.getName());
            existingClassroom.setLevel(updatedClassroom.getLevel());

            Classroom savedClassroom = repository.save(existingClassroom);
            return ResponseEntity.ok(savedClassroom);
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}

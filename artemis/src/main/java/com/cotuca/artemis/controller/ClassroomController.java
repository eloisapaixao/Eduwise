package com.cotuca.artemis.controller;

import com.cotuca.artemis.model.*;
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
    public List<ClassroomRequest> getAll()
    {
        List<Classroom> classrooms = this.repository.findAll();

        List<ClassroomRequest> list = classrooms.stream().map(classroom -> new ClassroomRequest(classroom.getId(), classroom.getName())).toList();

        return list;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassroomResponse> getClassroomById(@PathVariable Integer id) {

        Optional<Classroom> optionalClassroom = repository.findById(id);

        if (optionalClassroom.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Classroom classroom = optionalClassroom.get();
        ClassroomResponse classroomResponse = new ClassroomResponse(classroom.getId(), classroom.getLevel(), classroom.getName());

        return ResponseEntity.ok(classroomResponse);
    }

    @GetMapping("/prof/{id}")
    public List<ClassroomRequest> getAllByTeacherId(@PathVariable Integer id) {
        List<Classroom> classrooms = this.repository.getClassroomByTeacherId(id);
        List<ClassroomRequest> list = classrooms.stream().map(classroom -> new ClassroomRequest(classroom.getId(), classroom.getName())).toList();
        return list;
    }

    @PostMapping
    public Classroom createClassroom(@RequestBody ClassroomData classroom){
        System.out.println(classroom.teacher());
        Teacher teacher = repositoryTeacher.findById(classroom.teacher()).orElse(null);
        Classroom sala = new Classroom(0, classroom.nome(), classroom.level(), teacher);
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

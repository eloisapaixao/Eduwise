package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Classroom;
import com.cotuca.artemis.model.Content;
import com.cotuca.artemis.model.Student;
import com.cotuca.artemis.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    List<Student> findByClassroom(Classroom classroom);
}

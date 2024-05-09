package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}

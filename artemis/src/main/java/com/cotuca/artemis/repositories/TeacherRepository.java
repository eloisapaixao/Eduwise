package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    public Optional<Teacher> findByEmail(String email);
}
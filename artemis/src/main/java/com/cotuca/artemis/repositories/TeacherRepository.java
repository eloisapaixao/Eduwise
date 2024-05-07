package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> { }
package com.eduwise.API.repositories;

import com.eduwise.API.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Integer> { }

package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Content;
import com.cotuca.artemis.model.Subject;
import com.cotuca.artemis.model.Teacher;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Integer> {
    List<Content> findBySubject(Subject subject);
}
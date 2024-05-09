package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
}

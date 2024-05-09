package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassroomRepository extends JpaRepository<Classroom, Integer> {
}

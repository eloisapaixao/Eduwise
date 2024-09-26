package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassroomRepository extends JpaRepository<Classroom, Integer> {
    @Query(value = "SELECT * FROM classroom WHERE teacher_id = :id", nativeQuery = true)
    List<Classroom> getClassroomByTeacherId(@Param("id") Integer idProfessor);
}

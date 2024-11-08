package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Classroom;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClassroomRepository extends JpaRepository<Classroom, Integer> {
    @Query(value = "SELECT * FROM classroom WHERE teacher_id = :id", nativeQuery = true)
    List<Classroom> getClassroomByTeacherId(@Param("id") Integer idProfessor);

    @Modifying
    @Transactional
    @Query(value = "UPDATE classroom SET is_archived = 1 WHERE id = :id", nativeQuery = true)
    void archiveClassroomById(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE classroom SET is_archived = 0 WHERE id = :id", nativeQuery = true)
    void unarchiveClassroomById(@Param("id") Integer id);
}

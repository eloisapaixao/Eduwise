package repositories;

import entities.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ProfessorRepository extends JpaRepository<Professor, String> {
}

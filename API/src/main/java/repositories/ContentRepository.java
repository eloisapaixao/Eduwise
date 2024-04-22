package repositories;

import entities.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ContentRepository extends JpaRepository<Content, Integer> {
}

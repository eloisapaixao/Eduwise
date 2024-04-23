package repositories;

import entities.Matter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Matter, Integer> {
}

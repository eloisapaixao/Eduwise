package repositories;

import entities.Hability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabilityRepository extends JpaRepository<Hability, Integer> {
}

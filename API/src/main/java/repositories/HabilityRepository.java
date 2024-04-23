package repositories;

import entities.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabilityRepository extends JpaRepository<Skill, Integer> {
}

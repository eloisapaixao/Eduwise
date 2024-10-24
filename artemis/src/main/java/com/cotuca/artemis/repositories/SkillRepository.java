package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Content;
import com.cotuca.artemis.model.Skill;
import com.cotuca.artemis.model.Subcontent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, String> {
    List<Skill> findBySubcontent(Subcontent subcontent);
}

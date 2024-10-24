package com.cotuca.artemis.repositories;

import com.cotuca.artemis.model.Content;
import com.cotuca.artemis.model.Subcontent;
import com.cotuca.artemis.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcontentRepository extends JpaRepository<Subcontent, Integer> {
    List<Subcontent> findByContent(Content content);
}
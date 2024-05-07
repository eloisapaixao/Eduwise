package com.cotuca.artemis.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class ContentSkill {
    @Id
    @ManyToOne
    @JoinColumn(name = "contentId")
    private Content content;

    @Id
    @ManyToOne
    @JoinColumn(name = "skillId")
    private Skill skill;
}

package com.cotuca.artemis.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "content")
    private List<ContentSkill> skills;

    @OneToOne
    @JoinColumn(name = "subjectId")
    private Subject subject;
}

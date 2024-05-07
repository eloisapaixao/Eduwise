package com.cotuca.artemis.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false)
    private Double nota;

    @ManyToOne
    @JsonIgnoreProperties("contents")
    private Matter matter;

    @OneToMany(mappedBy = "content")
    @JsonIgnoreProperties("content")
    private List<Skill> skills;
}

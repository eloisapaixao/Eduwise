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
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false)
    private Integer serie;

    @OneToMany(mappedBy = "classe")
    @JsonIgnoreProperties("classe")
    private List<Student> students;

    @ManyToMany(mappedBy = "classes")
    @JsonIgnoreProperties("classes")
    private List<Teacher> teachers;
}

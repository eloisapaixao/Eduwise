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
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String email;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(nullable = false, length = 20)
    private String password;

    @Column(nullable = false, length = 100)
    private String school;

    @ManyToMany
    @JoinTable(name = "Teacher_Classroom", joinColumns = @JoinColumn(name = "Teacher_id"), inverseJoinColumns = @JoinColumn(name = "Classroom_id"))
    @JsonIgnoreProperties("teachers")
    private List<Classroom> classes;
}

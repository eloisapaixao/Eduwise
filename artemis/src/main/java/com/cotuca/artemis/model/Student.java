package com.cotuca.artemis.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private Date birthday;

    @Column(nullable = false, length = 50)
    private String email;

    @ManyToOne
    @JsonIgnoreProperties("students")
    private Classroom classe;

    @OneToMany(mappedBy = "student")
    @JsonIgnoreProperties("student")
    private List<Matter> matters;
}

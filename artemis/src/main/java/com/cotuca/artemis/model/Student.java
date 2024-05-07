package com.cotuca.artemis.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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
    private LocalDate birthday;

    @Column(nullable = false, length = 50)
    private String email;

    @OneToOne
    @JoinColumn(name = "classroomId")
    private Classroom classroom;

    @OneToMany(mappedBy = "student")
    private List<StudentSubject> subjects;
}

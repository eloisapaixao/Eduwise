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
public class StudentSubject {
    @Id
    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;

    @Id
    @ManyToOne
    @JoinColumn(name = "subjectId")
    private Subject subject;
}

package com.cotuca.artemis.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class TeacherClassroom {
    @Id
    @ManyToOne
    @JoinColumn(name = "teacherId")
    private Teacher teacher;

    @Id
    @ManyToOne
    @JoinColumn(name = "classroomId")
    private Classroom classroom;
}

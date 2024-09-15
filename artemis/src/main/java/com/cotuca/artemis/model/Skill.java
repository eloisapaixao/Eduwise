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
public class Skill {
    @Id
    private String id;

    @Column(nullable = false, length = 500)
    private String name;

    @OneToOne
    @JoinColumn(name = "subcontentId")
    private Subcontent subcontent;
}

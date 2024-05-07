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
public class Matter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("matters")
    private Student student;


    @OneToMany(mappedBy = "matter")
    @JsonIgnoreProperties("matter")
    private List<Content> contents;
}

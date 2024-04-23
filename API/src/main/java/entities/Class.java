package entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Table(name = "class")
@Entity(name = "class")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private int serie;

    @OneToMany(mappedBy = "classe")
    private Student students;

    @ManyToMany(mappedBy = "classes")
    @JsonIgnoreProperties("classes")
    private List<Professor> professores;
}

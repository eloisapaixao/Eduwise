package entities;

import jakarta.persistence.*;

import java.util.List;

@Table(name = "content")
@Entity(name = "content")
public class Content {
    @Id
    private Integer id;
    private String name;
    private Double nota;

    @OneToMany(mappedBy = "content")
    private List<Skill> skills;

    @ManyToOne
    private Matter matter;
}

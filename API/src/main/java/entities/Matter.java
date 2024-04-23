package entities;

import jakarta.persistence.*;

@Table(name = "material")
@Entity(name = "material")
public class Matter {
    @Id
    private Integer id;
    private String name;

    @OneToMany(mappedBy = "matter")
    private Content contents;

    @ManyToOne()
    private Student student;
}

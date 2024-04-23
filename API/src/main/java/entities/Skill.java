package entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name = "hability")
@Entity(name = "hability")
public class Skill {
    @Id
    private Integer id;
    private String name;

    @ManyToOne
    private Content content;
}

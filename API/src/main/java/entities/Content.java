package entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.List;

@Table(name = "content")
@Entity(name = "content")
public class Content {
    @Id
    private Integer id;
    private String name;
    private Double nota;
    private List<Hability> habilities;
}

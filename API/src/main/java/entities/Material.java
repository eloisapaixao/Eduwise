package entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.List;

@Table(name = "material")
@Entity(name = "material")
public class Material {
    @Id
    private Integer id;
    private String name;
    private List<Content> contents;
}

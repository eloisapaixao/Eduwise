package entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.List;

@Table(name = "class")
@Entity(name = "class")
public class Class {
    @Id
    private Integer id;
    private String name;
    private int serie;
    private List<Student> students;
}

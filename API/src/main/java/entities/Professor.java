package entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Table(name="professor")
@Entity(name = "professor")
public class Professor {
    @Id
    private String email;
    private String username;
    private String password;
    private String school;
    @ManyToMany
    @JoinTable(name = "Professor_Class", joinColumns = @JoinColumn(name = "Class_id"), inverseJoinColumns = @JoinColumn(name = "Professor_id"))
    @JsonIgnoreProperties("professores")
    private List<Class> classes;
}

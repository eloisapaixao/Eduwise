package entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.List;

@Table(name="professor")
@Entity(name = "professor")
public class Professor {
    @Id
    private String email;
    private String username;
    private String password;
    private String school;
    private List<Class> classes;
}

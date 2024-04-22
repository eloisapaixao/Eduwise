package entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Table(name = "student")
@Entity(name = "student")
public class Student {
    @Id
    private Integer id;
    private String name;
    private Date birthday;
    private String email;
    private List<Material> materials;
    private List<Class> classes;
}

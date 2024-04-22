package entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "hability")
@Entity(name = "hability")
public class Hability {
    @Id
    private Integer id;
    private String name;
}

package com.cotuca.artemis.model;

import java.time.LocalDate;
import java.util.List;

public record StudentData(Integer id, String name, LocalDate birthday, String email, Integer classrromId) {
}

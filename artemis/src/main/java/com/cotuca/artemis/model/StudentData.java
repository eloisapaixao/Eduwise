package com.cotuca.artemis.model;

import java.time.LocalDate;
import java.util.List;

public record StudentData(int id, String name, LocalDate birthday, String email, int classrromId, List<Integer> subjects) {
}

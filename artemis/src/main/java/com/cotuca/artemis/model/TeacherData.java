package com.cotuca.artemis.model;

import java.util.List;

public record TeacherData(Integer id, String email, String username, String password, String school, List<Integer> classrooms) {

}

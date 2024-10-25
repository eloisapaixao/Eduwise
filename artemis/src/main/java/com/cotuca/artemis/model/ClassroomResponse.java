package com.cotuca.artemis.model;

import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
public class ClassroomResponse {
    private Integer id;
    private Integer level;
    private String name;

    public ClassroomResponse() {}

    public ClassroomResponse(Integer id, Integer level, String name) {
        this.id = id;
        this.level = level;
        this.name = name;
    }
}

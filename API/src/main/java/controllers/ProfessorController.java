package controllers;

import entities.Professor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class ProfessorController {
    @GetMapping
    public void getAll(){

    }
}

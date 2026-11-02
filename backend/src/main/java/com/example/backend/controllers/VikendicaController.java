package com.example.backend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.VikendicaRepo;
import com.example.backend.models.Vikendica;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController 
@RequestMapping("/cottage")
@CrossOrigin(origins = "http://localhost:4200/")
public class VikendicaController {
    @GetMapping("/getAllCottages")
    public List<Vikendica> getAll() {
        return new VikendicaRepo().getAll();
    }
    @GetMapping("/getOne/{imevikendice}")
    public Vikendica getOne(@PathVariable String imevikendice) {
        String imeVikendice = imevikendice.replace("_", " ");
        System.out.println(imeVikendice);
        return new VikendicaRepo().getOne(imeVikendice);
    }
    @PostMapping("/deleteCottage")
    public int deleteCottage(@RequestBody Vikendica vikendica) {
        return new VikendicaRepo().deleteCottage(vikendica);
    }
    @PostMapping("/changeCottage")
    public int changeCottage(@RequestBody Vikendica v) {
        return new VikendicaRepo().changeCottage(v);
    }
    @PostMapping("/addCottage")
    public int addCottage(@RequestBody  Vikendica v) {
        return new VikendicaRepo().addCottage(v);
    }
    @PostMapping("/ban")
    public int ban(@RequestBody  Vikendica v) {
        return new VikendicaRepo().ban(v);

    }
    
    
}

package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.GalerijaRepo;
import com.example.backend.models.GalerijaSlika;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController 
@RequestMapping("/gallery")
@CrossOrigin(origins = "http://localhost:4200/")
public class GalerijaController {
    @GetMapping("/name/{imevikendice}")
    public List<String> getPictures(@PathVariable String imevikendice) {
        String imeVikendice = imevikendice.replace("_", " ");
        // System.out.println(imeVikendice);
        return new GalerijaRepo().getPictures(imeVikendice);
    }
    @PostMapping("/addPictures")
    public int postMethodName(@RequestBody GalerijaSlika entity) {
        return new GalerijaRepo().addPictures(entity);
    }
    @PostMapping("/deleteFromGallery")
    public int deleteFromGallery(@RequestBody String imeVikendice) {
        return new GalerijaRepo().deleteFromGallery(imeVikendice);
    }
    
}

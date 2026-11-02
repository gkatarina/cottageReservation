package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.RecenzijaRepo;
import com.example.backend.models.Recenzija;

@RestController 
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:4200/")
public class RecenzijeController {
    @GetMapping("/getReview/{imevikendice}")
    public List<Recenzija> getAllReviews(@PathVariable String imevikendice) {
        String imeVikendice = imevikendice.replace("_", " ");

        return new RecenzijaRepo().getAllReviews(imeVikendice);
    }
    
    @PostMapping("/addReview")
    public String addReview(@RequestBody Recenzija entity) {
        System.out.println(entity.getImeVikendice());
        return new RecenzijaRepo().addReview(entity);
    }
    
    @GetMapping("/getAverageRating/{imevikendice}")
    public float getAverageRating(@PathVariable String imevikendice) {
        // String imeVikendice = imevikendice.replace("_", " ");

        return new RecenzijaRepo().getAverageRating(imevikendice);
    }
    @PostMapping("/deleteReview")
    public int deleteReview(@RequestBody String imevikendice) {
    
        return new RecenzijaRepo().deleteReview(imevikendice);
    }
    

}

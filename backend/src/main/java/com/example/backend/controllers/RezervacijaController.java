package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.RecenzijaRepo;
import com.example.backend.db.dao.RezervacijaRepo;
import com.example.backend.models.Recenzija;
import com.example.backend.models.Rezervacija;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController 
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:4200/")
public class RezervacijaController {
    @PostMapping("/newReservation")
    // reservations/newReservation
    public int newReservation(@RequestBody Rezervacija entity) {
        return new RezervacijaRepo().newReservation(entity);
    }
    @GetMapping("/getReservations/{reservation}")
    public List<Rezervacija> getReservations(@PathVariable String reservation) {
        // System.out.println(reservation);
        // String res = reservation.replace("_", " ");
        return new RezervacijaRepo().getReservations(reservation);
    }
    @GetMapping("/getReservationByName/{korisnik}")
    public List<Rezervacija> getReservationsByUser(@PathVariable String korisnik) {
        // System.out.println(korisnik);
        // String res = reservation.replace("_", " ");
        return new RezervacijaRepo().getReservationsByName(korisnik);
    }
    @PostMapping("/cancelReservation")
    public int cancelReservation(@RequestBody Rezervacija entity) {
      
        return new RezervacijaRepo().cancelReservation(entity);
    }
    // @PostMapping("/alterReservation")
    // public int alterReservation(@RequestBody Rezervacija entity) {
      
    //     return new RezervacijaRepo().alterReservation(entity);
    // }
    @PostMapping("/reviewReservation")
    public int reviewReservation(@RequestBody Rezervacija r){
        return new RezervacijaRepo().reviewReservation(r);
    }
    @GetMapping("/getReservationByOwner/{vlasnik}")
    public List<Rezervacija> getReservationsByOwner(@PathVariable String vlasnik) {
        // System.out.println(vlasnik);
        return new RezervacijaRepo().getReservationsByOwner(vlasnik);
    }
    @PostMapping("/deleteReservation")
    public int deleteReservation(@RequestBody String imeVikendice) {
      
        return new RezervacijaRepo().deleteReservation(imeVikendice);
    }

}

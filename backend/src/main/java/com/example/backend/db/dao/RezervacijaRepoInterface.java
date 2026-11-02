package com.example.backend.db.dao;


import java.util.List;

import com.example.backend.models.Rezervacija;

public interface RezervacijaRepoInterface {
    public int newReservation(Rezervacija r);
    public List<Rezervacija> getReservations(String r);
    public List<Rezervacija> getReservationsByName(String r);
} 
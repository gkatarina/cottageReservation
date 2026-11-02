package com.example.backend.db.dao;


import com.example.backend.models.Korisnik;

public interface KorisnikRepoInterface {
    public Korisnik login(String username, String password);
    public String register(Korisnik user);
    public String changePassword(String username, String newPassword);
    public Korisnik getUser(String username);
    public String updateInformation(Korisnik korisnik);
}
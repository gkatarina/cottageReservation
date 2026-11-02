package com.example.backend.models;


public class Vikendica {
    private String imeVikendice, mesto, telefon, usluge, imeVlasnika;
    private int cena;
    private float lantitude, longitude;
    private int idV, cenaLeti;
    private long vremeBlokiranja;
    public Vikendica(String imeVikendice, String mesto, String telefon, String usluge, String imeVlasnika, int cena, float lantitude, float longitude, int idV, int cenaLeti, long vremeBlokiranja) {
        this.imeVikendice = imeVikendice;
        this.mesto = mesto;
        this.telefon = telefon;
        this.usluge = usluge;
        this.imeVlasnika = imeVlasnika;
        this.cena = cena;
        this.lantitude = lantitude;
        this.longitude = longitude;
        this.idV = idV;
        this.cenaLeti = cenaLeti;
        this.vremeBlokiranja = vremeBlokiranja;
    }
    
    public String getImeVikendice() {
        return imeVikendice;
    }
    public void setImeVikendice(String imeVikendice) {
        this.imeVikendice = imeVikendice;
    }
    public String getMesto() {
        return mesto;
    }
    public void setMesto(String mesto) {
        this.mesto = mesto;
    }
    public String getTelefon() {
        return telefon;
    }
    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }
    public String getUsluge() {
        return usluge;
    }
    public void setUsluge(String usluge) {
        this.usluge = usluge;
    }
    public String getImeVlasnika() {
        return imeVlasnika;
    }
    public void setImeVlasnika(String imeVlasnika) {
        this.imeVlasnika = imeVlasnika;
    }
    public int getCena() {
        return cena;
    }
    public void setCena(int cena) {
        this.cena = cena;
    }
    public float getLantitude() {
        return lantitude;
    }
    public void setLantitude(float lantitude) {
        this.lantitude = lantitude;
    }
    public float getLongitude() {
        return longitude;
    }
    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }
    public int getIdV() {
        return idV;
    }
    public void setIdV(int idV) {
        this.idV = idV;
    }
    public int getCenaLeti() {
        return cenaLeti;
    }
    public void setCenaLeti(int cenaLeti) {
        this.cenaLeti = cenaLeti;
    }

    public long getVremeBlokiranja() {
        return vremeBlokiranja;
    }

    public void setVremeBlokiranja(long vremeBlokiranja) {
        this.vremeBlokiranja = vremeBlokiranja;
    } 
    
    
}

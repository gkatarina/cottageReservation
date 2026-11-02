package com.example.backend.models;

import java.sql.Date;

public class Rezervacija {
    private int idP;
    private Date datumPocetka, datumKraja;
    private int brOdraslih, brDece;
    private String opis;
    private int cena;
    private boolean aktivirano;
    private String korisnik, imeVikendice;
    private int idRecenzije;
    private String komentarVlasnika, vlasnik;
    private boolean arhivirano;
    private Date datumRezervacije;
    public Rezervacija(int idP, Date datumPocetka, Date datumKraja, int brOdraslih, int brDece, String opis, int cena,
            boolean aktivirano, String korisnik, String imeVikendice, int idRecenzije, String komentarVlasnika, String vlasnik, boolean arhivirano, Date datumRezervacije) {
        this.idP = idP;
        this.datumPocetka = datumPocetka;
        this.datumKraja = datumKraja;
        this.brOdraslih = brOdraslih;
        this.brDece = brDece;
        this.opis = opis;
        this.cena = cena;
        this.aktivirano = aktivirano;
        this.korisnik = korisnik;
        this.imeVikendice = imeVikendice;
        this.idRecenzije = idRecenzije;
        this.komentarVlasnika = komentarVlasnika;
        this.vlasnik = vlasnik;
        this.arhivirano = arhivirano;
        this.datumRezervacije = datumRezervacije;
    }
    
    public String getKorisnik() {
        return korisnik;
    }
    public void setKorisnik(String korisnik) {
        this.korisnik = korisnik;
    }
    public String getImeVikendice() {
        return imeVikendice;
    }
    public void setImeVikendice(String imeVikendice) {
        this.imeVikendice = imeVikendice;
    }
    public Date getDatumPocetka() {
        return datumPocetka;
    }
    public void setDatumPocetka(Date datumPocetka) {
        this.datumPocetka = datumPocetka;
    }
    public Date getDatumKraja() {
        return datumKraja;
    }
    public void setDatumKraja(Date datumKraja) {
        this.datumKraja = datumKraja;
    }
    public int getBrOdraslih() {
        return brOdraslih;
    }
    public void setBrOdraslih(int brOdraslih) {
        this.brOdraslih = brOdraslih;
    }
    public int getBrDece() {
        return brDece;
    }
    public void setBrDece(int brDece) {
        this.brDece = brDece;
    }
   
    public String getOpis() {
        return opis;
    }
    public void setOpis(String opis) {
        this.opis = opis;
    }
    public int getCena() {
        return cena;
    }
    public void setCena(int cena) {
        this.cena = cena;
    }
    public boolean isAktivirano() {
        return aktivirano;
    }
    public void setAktivirano(boolean aktivirano) {
        this.aktivirano = aktivirano;
    }

    public int getIdP() {
        return idP;
    }

    public void setIdP(int idP) {
        this.idP = idP;
    }

    public int getIdRecenzije() {
        return idRecenzije;
    }

    public void setIdRecenzije(int idRecenzije) {
        this.idRecenzije = idRecenzije;
    }

    public String getKomentarVlasnika() {
        return komentarVlasnika;
    }

    public void setKomentarVlasnika(String komentarVlasnika) {
        this.komentarVlasnika = komentarVlasnika;
    }

    public String getVlasnik() {
        return vlasnik;
    }

    public void setVlasnik(String vlasnik) {
        this.vlasnik = vlasnik;
    }

    public boolean isArhivirano() {
        return arhivirano;
    }

    public void setArhivirano(boolean arhivirano) {
        this.arhivirano = arhivirano;
    }

    public Date getDatumRezervacije() {
        return datumRezervacije;
    }

    public void setDatumRezervacije(Date datumRezervacije) {
        this.datumRezervacije = datumRezervacije;
    }

}

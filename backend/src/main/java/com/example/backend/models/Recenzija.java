package com.example.backend.models;

public class Recenzija {
    private int idR;
    private String imevikendice, vlasnik, komentar; 
    private int ocena, idRezervacije;
    private long vremeRecenzije;
    public Recenzija(int idR, String imevikendice, String vlasnik, String komentar, int ocena, int idRezervacije, long vremeRecenzije) {
        this.idR = idR;
        this.imevikendice = imevikendice;
        this.vlasnik = vlasnik;
        this.komentar = komentar;
        this.ocena = ocena;
        this.idRezervacije = idRezervacije;
        this.vremeRecenzije = vremeRecenzije;
    }
    
    public String getImevikendice() {
        return imevikendice;
    }

    public void setImevikendice(String imevikendice) {
        this.imevikendice = imevikendice;
    }

    public long getVremeRecenzije() {
        return vremeRecenzije;
    }

    public void setVremeRecenzije(long vremeRecenzije) {
        this.vremeRecenzije = vremeRecenzije;
    }

    public String getImeVikendice() {
        return imevikendice;
    }
    public void setImeVikendice(String imeVikendice) {
        this.imevikendice = imeVikendice;
    }
    public String getVlasnik() {
        return vlasnik;
    }
    public void setVlasnik(String vlasnik) {
        this.vlasnik = vlasnik;
    }
    public String getKomentar() {
        return komentar;
    }
    public void setKomentar(String komentar) {
        this.komentar = komentar;
    }
    public int getOcena() {
        return ocena;
    }
    public void setOcena(int ocena) {
        this.ocena = ocena;
    }

    public int getIdR() {
        return idR;
    }

    public void setIdR(int idR) {
        this.idR = idR;
    }

    public int getIdRezervacije() {
        return idRezervacije;
    }

    public void setIdRezervacije(int idRezervacije) {
        this.idRezervacije = idRezervacije;
    } 
    
}

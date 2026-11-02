package com.example.backend.models;

public class Korisnik {
    private String kor_ime, lozinka, ime, prezime, pol, adresa, telefon, imejl, profilna_slika, broj_kreditne_kartice, tip, nalog;
    private boolean odobren;
    
    
    public Korisnik(String kor_ime, String lozinka, String ime, String prezime, String pol, String adresa,
            String telefon, String imejl, String profilna_slika, String broj_kreditne_kartice, String tip, boolean odobren, String nalog) {
        this.kor_ime = kor_ime;
        this.lozinka = lozinka;
        this.ime = ime;
        this.prezime = prezime;
        this.pol = pol;
        this.adresa = adresa;
        this.telefon = telefon;
        this.imejl = imejl;
        this.profilna_slika = profilna_slika;
        this.broj_kreditne_kartice = broj_kreditne_kartice;
        this.tip = tip;
        this.odobren = odobren;
        this.nalog = nalog;
       
    }

    public String getNalog() {
        return nalog;
    }

    public void setNalog(String nalog) {
        this.nalog = nalog;
    }

    public boolean isOdobren() {
        return odobren;
    }

    public void setOdobren(boolean odobren) {
        this.odobren = odobren;
    }

    public String getKor_ime() {
        return kor_ime;
    }

    public void setKor_ime(String kor_ime) {
        this.kor_ime = kor_ime;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getPol() {
        return pol;
    }

    public void setPol(String pol) {
        this.pol = pol;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getImejl() {
        return imejl;
    }

    public void setImejl(String imejl) {
        this.imejl = imejl;
    }

    public String getProfilna_slika() {
        return profilna_slika;
    }

    public void setProfilna_slika(String profilna_slika) {
        this.profilna_slika = profilna_slika;
    }

    public String getBroj_kreditne_kartice() {
        return broj_kreditne_kartice;
    }

    public void setBroj_kreditne_kartice(String broj_kreditne_kartice) {
        this.broj_kreditne_kartice = broj_kreditne_kartice;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }
    
}

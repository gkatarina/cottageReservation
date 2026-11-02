package com.example.backend.models;

public class GalerijaSlika {
    private String imeVikendice;
    private String slikaVikendice;
    
    public GalerijaSlika(String imeVikendice, String slikaVikendice) {
        this.imeVikendice = imeVikendice;
        this.slikaVikendice = slikaVikendice;
    }
    public String getImeVikendice() {
        return imeVikendice;
    }
    public void setImeVikendice(String imeVikendice) {
        this.imeVikendice = imeVikendice;
    }
    public String getSlikaVikendice() {
        return slikaVikendice;
    }
    public void setSlikaVikendice(String slikaVikendice) {
        this.slikaVikendice = slikaVikendice;
    } 

    
    
}

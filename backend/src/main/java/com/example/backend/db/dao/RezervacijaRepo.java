package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Rezervacija;

public class RezervacijaRepo implements RezervacijaRepoInterface{
     public int newReservation(Rezervacija r) {
        try(Connection conn = DB.source().getConnection();
         PreparedStatement ps = conn.prepareStatement("insert into rezervacije (datumPocetka, datumKraja, brOdraslih, brDece, opis, cena, aktivirano, korisnik, imeVikendice, idRecenzije, komentarVlasnika, vlasnik, arhivirano, datumRezervacije) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");) {
            ps.setDate(1, (r.getDatumPocetka()));
            ps.setDate(2, (r.getDatumKraja()));
            ps.setInt(3, r.getBrOdraslih());
            ps.setInt(4, r.getBrDece());
            ps.setString(5, r.getOpis());
            ps.setInt(6, r.getCena());
            ps.setBoolean(7, r.isAktivirano());
            ps.setString(8, r.getKorisnik());
            ps.setString(9, r.getImeVikendice());
            ps.setInt(10, r.getIdRecenzije());
            ps.setString(11, r.getKomentarVlasnika());
            ps.setString(12, r.getVlasnik());
            ps.setBoolean(13, r.isArhivirano());
            ps.setDate(14, r.getDatumRezervacije());
            return ps.executeUpdate();

        } catch(SQLException e) {
            e.printStackTrace();
        } return 0;
    }
   
    public List<Rezervacija> getReservations(String r) {
        try(Connection conn = DB.source().getConnection();
         PreparedStatement ps = conn.prepareStatement("select * from rezervacije where imeVikendice=?");) {
            ps.setString(1, r);

            List<Rezervacija> rezervacije = new ArrayList<>();
            ResultSet rs = ps.executeQuery();
            
            while(rs.next()) {
                rezervacije.add(new Rezervacija(rs.getInt("idP"), rs.getDate("datumPocetka"), rs.getDate("datumKraja"), rs.getInt("brOdraslih"), rs.getInt("brDece"), rs.getString("opis"), rs.getInt("cena"), rs.getBoolean("aktivirano"), rs.getString("korisnik"), rs.getString("imeVikendice"), rs.getInt("idRecenzije"), rs.getString("komentarVlasnika"), rs.getString("vlasnik"),rs.getBoolean("arhivirano"), rs.getDate("datumRezervacije")));
            }
        
            return rezervacije;
         } catch(SQLException e) {
            e.printStackTrace();
         } return null;
    }
    public List<Rezervacija> getReservationsByName(String r) {
        try(Connection conn = DB.source().getConnection();
         PreparedStatement ps = conn.prepareStatement("select * from rezervacije where korisnik=?");) {
            ps.setString(1, r);

            List<Rezervacija> rezervacije = new ArrayList<>();
            ResultSet rs = ps.executeQuery();
            
            while(rs.next()) {
                rezervacije.add(new Rezervacija(rs.getInt("idP"), rs.getDate("datumPocetka"), rs.getDate("datumKraja"), rs.getInt("brOdraslih"), rs.getInt("brDece"), rs.getString("opis"), rs.getInt("cena"), rs.getBoolean("aktivirano"), rs.getString("korisnik"), rs.getString("imeVikendice"), rs.getInt("idRecenzije"), rs.getString("komentarVlasnika"), rs.getString("vlasnik"),rs.getBoolean("arhivirano"), rs.getDate("datumRezervacije")));
            }
            // System.out.println(rezervacije.get(0).getIdP());
            return rezervacije;
         } catch(SQLException e) {
            e.printStackTrace();
         } return null;

    }
    public List<Rezervacija> getReservationsByOwner(String r) {
        try(Connection conn = DB.source().getConnection();
         PreparedStatement ps = conn.prepareStatement("select * from rezervacije where vlasnik=?");) {
            ps.setString(1, r);

            List<Rezervacija> rezervacije = new ArrayList<>();
            ResultSet rs = ps.executeQuery();
            
            while(rs.next()) {
                rezervacije.add(new Rezervacija(rs.getInt("idP"), rs.getDate("datumPocetka"), rs.getDate("datumKraja"), rs.getInt("brOdraslih"), rs.getInt("brDece"), rs.getString("opis"), rs.getInt("cena"), rs.getBoolean("aktivirano"), rs.getString("korisnik"), rs.getString("imeVikendice"), rs.getInt("idRecenzije"), rs.getString("komentarVlasnika"), rs.getString("vlasnik"), rs.getBoolean("arhivirano"), rs.getDate("datumRezervacije")));
            }
            System.out.println("rezervacija" + rezervacije.get(0).getDatumKraja());
            return rezervacije;
         } catch(SQLException e) {
            e.printStackTrace();
         } return null;

    }
    public int cancelReservation(Rezervacija r) {
        try(Connection conn = DB.source().getConnection();
         PreparedStatement ps = conn.prepareStatement("delete from rezervacije where idP=?");) {
            ps.setInt(1,r.getIdP());
            return ps.executeUpdate();

        } catch(SQLException e) {
            e.printStackTrace();
        } return 0;
    }
    public int reviewReservation(Rezervacija r) {
        try(Connection conn = DB.source().getConnection();
        PreparedStatement ps = conn.prepareStatement("update rezervacije set komentarVlasnika=?, aktivirano=? where idP=?");) {
           ps.setString(1,r.getKomentarVlasnika());
           ps.setBoolean(2, r.isAktivirano());
           ps.setInt(3, r.getIdP());
           return ps.executeUpdate();

       } catch(SQLException e) {
           e.printStackTrace();
       } return 0;
    }
    public int deleteReservation(String imevikendice) {
        try(Connection conn = DB.source().getConnection();
         PreparedStatement ps = conn.prepareStatement("delete from rezervacije where imevikendice=?");) {
            ps.setString(1,imevikendice);
            return ps.executeUpdate();

        } catch(SQLException e) {
            e.printStackTrace();
        } return 0;
    }

}

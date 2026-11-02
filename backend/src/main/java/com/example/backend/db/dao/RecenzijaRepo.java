package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Recenzija;

public class RecenzijaRepo {
    public List<Recenzija> getAllReviews(String imeVikendice)  {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select * from recenzije where imevikendice=?")) {
            ps.setString(1,imeVikendice);
            List<Recenzija> recenzije = new ArrayList<Recenzija>(); 
            ResultSet rs = ps.executeQuery();
            while(rs.next()) { // a da se napravim luda ja posto meni ime vlasnika svakako ne treba za recenziju da to bude vlasnik komentara :D 
                //ujelo me za bulju ovo ozbiljno
                Recenzija recenzija = new Recenzija(rs.getInt("idR"), rs.getString("imevikendice"), rs.getString("vlasnik"), rs.getString("komentar"), rs.getInt("ocena"), rs.getInt("idRezervacije"), rs.getLong("vremeRecenzije"));
                recenzije.add(recenzija);
            } 
            return recenzije;
        }catch(SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String addReview(Recenzija recenzija) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("insert into recenzije (imevikendice, vlasnik, komentar, ocena, idRezervacije, vremeRecenzije) values (?,?,?,?,?,?)")) {
            ps.setString(1,recenzija.getImeVikendice());
            ps.setString(2, recenzija.getVlasnik());
            ps.setString(3, recenzija.getKomentar());
            ps.setInt(4, recenzija.getOcena());
            ps.setInt(5, recenzija.getIdRezervacije());
            ps.setLong(6, recenzija.getVremeRecenzije());
            if(ps.executeUpdate() == 1) {
                return "Uspesno dodat komentar";
            }
        }catch(SQLException e) {
            e.printStackTrace();
        }
        return "Neuspesno dodavanje recenzije, pokusajte kasnije";
    }

    public float getAverageRating(String imeVikendice)  {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select avg(ocena + 0.0) as prosek from recenzije where imevikendice=?")) {
            ps.setString(1,imeVikendice);
            System.out.println(imeVikendice);
            ResultSet rs = ps.executeQuery();
            if(rs.next()) { 
                System.out.println(rs.getFloat("prosek"));
                return rs.getFloat("prosek");
            } 
        }catch(SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
    public int deleteReview(String imeVikendice) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("delete from recenzije where imevikendice=?")) {
            ps.setString(1,imeVikendice);
            System.out.println(imeVikendice);
           return ps.executeUpdate();
        }catch(SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
}

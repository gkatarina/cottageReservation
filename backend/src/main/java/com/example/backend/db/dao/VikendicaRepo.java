package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Vikendica;

public class VikendicaRepo implements VikendicaRepoInterface {

    @Override
    public List<Vikendica> getAll() {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select * from vikendica;");) {
            ResultSet rs = ps.executeQuery();
            List<Vikendica> vikendice = new ArrayList<Vikendica>();
            while(rs.next()) {
                vikendice.add(new Vikendica(rs.getString("imevikendice"), rs.getString("mesto"), rs.getString("telefon"), rs.getString("usluge"), rs.getString("imevlasnika"), rs.getInt("cena"), rs.getFloat("lantitude"), rs.getFloat("longitude"), rs.getInt("idV"), rs.getInt("cenaLeti"), rs.getLong("vremeBlokiranja")));
            }
            return vikendice;
        } catch(SQLException e ) {

        } return null;
    }
    @Override
    public Vikendica getOne(String imeVikendice) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select * from vikendica where imevikendice=?;");) {
            ps.setString(1, imeVikendice);
            ResultSet rs = ps.executeQuery();
            if(rs.next()) {
                return new Vikendica(rs.getString("imevikendice"), rs.getString("mesto"), rs.getString("telefon"), rs.getString("usluge"), rs.getString("imevlasnika"), rs.getInt("cena"), rs.getFloat("lantitude"), rs.getFloat("longitude"), rs.getInt("idV"), rs.getInt("cenaLeti"), rs.getLong("vremeBlokiranja"));
            }
            
        } catch(SQLException e ) {

        } return null;
    }
    public int changeCottage(Vikendica v) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("update vikendica set mesto=?, cena=?, telefon=?, usluge=?, lantitude=?, longitude=? where idV=?");) {
            // ps.setString(1, v.getImeVikendice()); //objektivno pusi kurac ceo projekat nema smisla ako ime vikendice moze da se menja mrs u picku amterinu
            ps.setString(1, v.getMesto());
            ps.setInt(2, v.getCena());
            ps.setString(3, v.getTelefon());
            ps.setString(4, v.getUsluge());
            ps.setFloat(5, v.getLantitude());
            ps.setFloat(6, v.getLongitude());
            ps.setInt(7, v.getIdV());
            
            return ps.executeUpdate();
            
        } catch(SQLException e ) {
            e.printStackTrace();

        } return 0;
    }
    public int deleteCottage(Vikendica v) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("delete from vikendica where imevikendice=?");) {
            ps.setString(1, v.getImeVikendice()); 
            return ps.executeUpdate();
            
        } catch(SQLException e ) {
            e.printStackTrace();
        } return 0;
    }
    public int addCottage(Vikendica v) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("insert into vikendica (imevikendice, mesto, cena, telefon, usluge, imevlasnika, lantitude, longitude, cenaLeti, vremeBlokiranja) values (?,?,?,?,?,?,?,?,?,?) ");) {
            ps.setString(1, v.getImeVikendice()); 
            ps.setString(2, v.getMesto());
            ps.setInt(3, v.getCena());
            ps.setString(4, v.getTelefon());
            ps.setString(5, v.getUsluge());
            ps.setString(6, v.getImeVlasnika());
            ps.setFloat(7, v.getLantitude());
            ps.setFloat(8, v.getLongitude());
            ps.setInt(9, v.getCenaLeti());
            ps.setLong(10, v.getVremeBlokiranja());
            return ps.executeUpdate();
            
        } catch(SQLException e ) {
            e.printStackTrace();
        } return 0;
    }
    public int ban(Vikendica v) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("update vikendica set vremeBlokiranja=? where imevikendice=?");) {
            ps.setLong(1, v.getVremeBlokiranja());
            ps.setString(2, v.getImeVikendice());
            
            return ps.executeUpdate();
            
        } catch(SQLException e ) {
            e.printStackTrace();
        } return 0;
    }
}
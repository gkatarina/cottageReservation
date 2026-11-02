package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.GalerijaSlika;

public class GalerijaRepo {

    public List<String> getPictures(String imeVikendice) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select * from galerija_slika where imevik=?");) {
            // System.out.println("test");
            ps.setString(1,imeVikendice);
            List<String> slike = new ArrayList<>(); 
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                slike.add(rs.getString("slikavikendice"));
            } 
            return slike;
        }catch(SQLException e) {

        }
        return null;
    }
    public int addPictures(GalerijaSlika slike) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("insert into galerija_slika values (?,?)");) {
        // for(int i = 0; i < slike.getSlikaVikendice().length(); i++) {
        ps.setString(1, slike.getSlikaVikendice());
        ps.setString(2, slike.getImeVikendice());

        return ps.executeUpdate();
        // }
        } catch(SQLException e) {
            e.printStackTrace();
        } return 0;

    }
    public int deleteFromGallery(String imeVikendice) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("delete from galerija_slika where imevik=?");) {
            ps.setString(1, imeVikendice);
    
            return ps.executeUpdate();
            } catch(SQLException e) {
                e.printStackTrace();
            } return 0;
    }
}

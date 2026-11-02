package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.spi.DirStateFactory.Result;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.backend.db.DB;
import com.example.backend.models.Korisnik;

public class KorisnikRepo implements KorisnikRepoInterface {

    @Override
    public Korisnik login(String username, String password) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select * from korisnici where kor_ime=?");) {
            ps.setString(1, username);
            // ps.setString(2, new BCryptPasswordEncoder().encode(password));
            // System.out.println(new BCryptPasswordEncoder().encode(password));
            System.out.println("sad smo u login fji");
            ResultSet rs = ps.executeQuery();
            
            if(rs.next()) {
                String hashedPass = rs.getString("lozinka");
                boolean isValid = BCrypt.checkpw(password, hashedPass); //aAaaa?1
                System.out.println(isValid);
                if(isValid) {
                    return new Korisnik(rs.getString("kor_ime"), rs.getString("lozinka"), rs.getString("ime"), rs.getString("prezime"), rs.getString("pol"), rs.getString("adresa"), rs.getString("telefon"), rs.getString("imejl"), rs.getString("profilna_slika"),rs.getString("broj_kreditne_kartice"), rs.getString("tip"), rs.getBoolean("odobren"), rs.getString("nalog"));
                } else return null;
            }
        } catch (SQLException e) {

        } return null;
    }

    @Override
    public String register(Korisnik user) {    //znaci prvo ide da li je nalog odobren pa tek onda da li je aktiviran ili deaktiviran
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("insert into korisnici values (?,?,?,?,?,?,?,?,?,?,?,?,?)");) {
            ps.setString(1, user.getKor_ime());
            ps.setString(2, new BCryptPasswordEncoder().encode(user.getLozinka()));
            ps.setString(3, user.getIme());
            ps.setString(4, user.getPrezime());
            ps.setString(5, user.getPol());
            ps.setString(6, user.getAdresa());
            ps.setString(7, user.getTelefon());
            ps.setString(8, user.getImejl());
            ps.setString(9, user.getProfilna_slika());
            ps.setString(10, user.getBroj_kreditne_kartice());
            ps.setString(11, user.getTip()); 
            ps.setBoolean(12, user.isOdobren()); 
            ps.setString(13, user.getNalog());

           if(ps.executeUpdate() == 1) {
                return new String("Uspesno registrovan korisnik. Vas nalog ce biti uskoro aktiviran.");
           }
           
        } catch (SQLException e) {

        } return new String("Korisnik nije uspesno registrovan. Molimo Vas pokusajte kasnije");
    }
    public String changePassword(String username, String newPassword) {

        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("update korisnici set lozinka=? where kor_ime =?");) {
            // ps1.setString(1, username);
            // ResultSet rs1 = ps1.executeQuery(); // ma da li mi treba uopste ovo? ne
            // boolean isValid = BCrypt.checkpw(oldPassword , rs1.getString("lozinka")); //aAaaa?1
            // meni samo nije jasno sta je pisac hteo reci logicno bi bilo da se ovo radi na nivou ulogovanog korisnika ko misli drugacije mora da se ubije
            // ugl ne mora da se proverava jer je uslov da se napise <stara_sifra> i nova sifra pa moze da se samo proveri 
            // ono sto je problem ovo ne moze ovako da se azurira 
            // nego mora da se proveri da l je lozinka dobra a da se po korisnickom imenu menja sifra...krejzi
            ps.setString(1, new BCryptPasswordEncoder().encode(newPassword));
            ps.setString(2, username);
            System.out.println("Username: " + username);
            System.out.println("Encoded password: " + new BCryptPasswordEncoder().encode(newPassword));

            if(ps.executeUpdate() == 1) {
                return new String("Lozinka uspesno promenjena. Molimo Vas ulogujte se ponovo.");
            } else {
                return new String("Lozinka nije uspesno promenjena");
            }
        
        } catch(SQLException e) {

        } return "Lozinka nije uspesno promenjena";
    }

    public Korisnik getUser(String username) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select * from korisnici where kor_ime=?");) {
            ps.setString(1, username);

            ResultSet rs = ps.executeQuery();
            
            if(rs.next()) {            
                return new Korisnik(rs.getString("kor_ime"), rs.getString("lozinka"), rs.getString("ime"), rs.getString("prezime"), rs.getString("pol"), rs.getString("adresa"), rs.getString("telefon"), rs.getString("imejl"), rs.getString("profilna_slika"),rs.getString("broj_kreditne_kartice"), rs.getString("tip"), rs.getBoolean("odobren"), rs.getString("nalog"));
            }
        } catch (SQLException e) {

        } return null;
    }
    public String updateInformation(Korisnik user) {
        try(Connection conn = DB.source().getConnection(); 
        PreparedStatement ps = conn.prepareStatement("UPDATE korisnici SET ime = COALESCE(NULLIF(?, ''), ime),prezime = COALESCE(NULLIF(?, ''), prezime), adresa = coalesce(NULLIF(?, ''), adresa), telefon = coalesce(NULLIF(?, ''), telefon), imejl = COALESCE(NULLIF(?, ''), imejl), broj_kreditne_kartice = COALESCE(NULLIF(?, ''), broj_kreditne_kartice),  profilna_slika = COALESCE(NULLIF(?, ''), profilna_slika) WHERE kor_ime = ?;");) {
                            System.out.println(user.getIme() + " " + user.getProfilna_slika() + " " +  user.getKor_ime());

                            ps.setString(1, user.getIme());
                            ps.setString(2, user.getPrezime());
                            ps.setString(3, user.getAdresa());
                            ps.setString(4, user.getTelefon());
                            ps.setString(5, user.getImejl());
                            ps.setString(6, user.getBroj_kreditne_kartice());
                            ps.setString(7, user.getProfilna_slika());
                            ps.setString(8, user.getKor_ime());
                            System.out.println("profilna slika" + user.getProfilna_slika());

                            if(ps.executeUpdate() == 1) {
                                return "Uspesno azurirani podaci.";
                            }
                        } catch(SQLException e) {

                        }
                        return "Neuspesno azurirani podaci";
    }
    public int getAllUsers(String tip) { //
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select count(*) as rezultat from korisnici where tip=?");) {
            ps.setString(1, tip);

            ResultSet rs = ps.executeQuery();
            System.out.println("tip " + tip);
            // System.out.println(rs.getInt("rezultat"));
            if(rs.next()){
                return rs.getInt("rezultat");
            }
           
        } catch (SQLException e) {
            e.printStackTrace();
        } return 0;
    }
    public List<Korisnik> getUsers() { //
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select * from korisnici where tip <> 'admin'");) {
            System.out.println("test");
            ResultSet rs = ps.executeQuery();

            List<Korisnik> korisnici = new ArrayList<>();
            while(rs.next()){
               korisnici.add(new Korisnik(rs.getString("kor_ime"), rs.getString("lozinka"), rs.getString("ime"), rs.getString("prezime"), rs.getString("pol"), rs.getString("adresa"), rs.getString("telefon"), rs.getString("imejl"), rs.getString("profilna_slika"),rs.getString("broj_kreditne_kartice"), rs.getString("tip"), rs.getBoolean("odobren"), rs.getString("nalog")));

            }
           return korisnici;
        } catch (SQLException e) {
            e.printStackTrace();
        } return null;
    }
    public int deactivateAccount(Korisnik k) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("update korisnici set nalog='deaktiviran' where kor_ime=?");) {
            ps.setString(1, k.getKor_ime());

            return ps.executeUpdate();
           
        } catch (SQLException e) {
            e.printStackTrace();
        } return 0;
    }
    public int updateAccountStatus(Korisnik k) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("update korisnici set nalog=?, odobren=? where kor_ime=?");) {
            ps.setString(1, k.getNalog());
            ps.setBoolean(2, k.isOdobren());
            ps.setString(3, k.getKor_ime());

            return ps.executeUpdate();
           
        } catch (SQLException e) {
            e.printStackTrace();
        } return 0;
    }
    public int getMail(String mail) {
        try(Connection conn = DB.source().getConnection(); PreparedStatement ps = conn.prepareStatement("select * from korisnici where imejl=?");) {
            ps.setString(1, mail);

            ResultSet rs = ps.executeQuery();
           if(rs.next()){
            return 0; //znaci da je pronadjen postojeci imejl to ne sme
           } else {
            System.out.println("mejl ne postoji sto je dobro");
            return 1;
           }
        } catch (SQLException e) {
            e.printStackTrace();
        } return 1;
    }
}

package com.example.backend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.KorisnikRepo;
import com.example.backend.models.Korisnik;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController 
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200/")
public class KorisnikController {
    
    @PostMapping("/login")
    public Korisnik login(@RequestBody Map<String, String> entity) {
        return new KorisnikRepo().login(entity.get("username"), entity.get("password"));
    }
    @PostMapping("/register")
    public String register(@RequestBody Korisnik entity) {
        
        return new KorisnikRepo().register(entity);
    }
    @PostMapping("/changePassword")
    public String changePassword(@RequestBody Map<String,String> entity) {
                                                //username      new pass   -- staru sifru ne proveravamo jer ovo radimo KAO ulogovan korisnik ja drugacije odbijam da radim
    String res = new KorisnikRepo().changePassword(entity.get("username"), entity.get("newPassword"));
        System.out.println(res);
        return new KorisnikRepo().changePassword(entity.get("username"), entity.get("newPassword"));
    }
    @PostMapping("/getUser") 
    public Korisnik register(@RequestBody String entity) {
        return new KorisnikRepo().getUser(entity);
    }
    @PostMapping("/updateInformation")
    public String updateInformation(@RequestBody Korisnik entity) {
        // System.out.println("test ");
        // System.out.println(entity.getKor_ime());
        return new KorisnikRepo().updateInformation(entity);
    }
    @GetMapping("/getCount/{tip}")
    public int getCount(@PathVariable String tip) {
        return new KorisnikRepo().getAllUsers(tip);
    }
    @GetMapping("/getUsers")
    public List<Korisnik> getUsers() {

        System.out.println("u kontroleru smo");
        return new KorisnikRepo().getUsers();
    }
    @PostMapping("/deactivateAccount")
    public int deactivateAccount(@RequestBody Korisnik k) {
        return new KorisnikRepo().deactivateAccount(k);
    }
    @PostMapping("/updateAccountStatus")
    public int updateAccountStatus(@RequestBody Korisnik k) {
        
        return new KorisnikRepo().updateAccountStatus(k);
    }
    @GetMapping("/getMail/{mail}")
    public int getMail(@PathVariable String mail) {
        // System.out.println((mail));
        return new KorisnikRepo().getMail(mail);
    }
    
}

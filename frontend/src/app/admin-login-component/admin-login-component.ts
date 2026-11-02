import { Component, inject } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik-service';
import { Router } from '@angular/router';
import { VikendicaService } from '../services/vikendica-service';
import { Vikendica } from '../models/vikendica';
import { Rezervacija } from '../models/rezervacija';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login-component',
  imports: [FormsModule],
  templateUrl: './admin-login-component.html',
  styleUrl: './admin-login-component.css'
})
export class AdminLoginComponent  {
  kor_ime=""
  lozinka=""
  message= ""
  vlasnik=false //default je kupac, mada su oba ruzna??
  router = inject(Router)
  korService = inject(KorisnikService)
  korisnik = new Korisnik()
  //message logs 
  usernameError = ""
  passwordError = ""
  emailError = ""
  creditCardError = ""
  admin = false;
  oldPassword= ""
  newPassword=""
  newPasswordRepeated=""
  msgPass = ""
  novi_korisnik = new Korisnik()
  neki_fajl!: File;
  //message logs 
  dinersKartica = false 
  visaKartica = false 
  masterCard = false
  selectedFile : File | null = null
  vikendicaService = inject(VikendicaService)
  vikendice : Array<Vikendica> = []
  rezervacije : Rezervacija[] = []
  korisnici : Korisnik[] = []
  login(kor_ime: String, lozinka: String) {
    this.korService.login(kor_ime, lozinka).subscribe(data=>{
      if(data!=null){
        if(data.odobren == false) {
          this.message= "ako je admin ovo ne sme da se desi ali neka ostane upit treba da bude uvek aktiviran"
        } else {
        this.korisnik = data
        localStorage.setItem('loginUn', this.korisnik.kor_ime);
        if(this.korisnik.tip=="admin"){
          this.admin = true
          console.log("admin panel")
          this.router.navigate(['/adminPanel'], { queryParams: { kor_ime: this.korisnik.kor_ime, lozinka: this.korisnik.lozinka } });


        }
      }
      } else {
        this.message = "Pogresno korisnicko ime ili lozinka"
      }
    })
  }
}
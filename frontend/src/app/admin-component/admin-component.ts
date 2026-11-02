import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik-service';
import { Korisnik } from '../models/korisnik';
import { FormsModule } from '@angular/forms';
import { VikendicaService } from '../services/vikendica-service';
import { Vikendica } from '../models/vikendica';
import { Rezervacija } from '../models/rezervacija';
import { CommonModule } from '@angular/common';
import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { Recenzija } from '../models/recenzija';

@Component({
  selector: 'app-admin-component',
  imports: [FormsModule, CommonModule, CdkOverlayOrigin],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css'
})
export class AdminComponent implements OnInit{
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
  prosekOcena: Map<string,number> = new Map()

  ngOnInit(): void {
    this.korService.getUsers().subscribe(data => {
      if(data !=null) {
        this.korisnici = data
      } else {
        console.log("data null")
      }
    })

    this.vikendicaService.getAll().subscribe(data => {
      if(data != null){
        this.vikendice = data
        for(let v of this.vikendice) {
          let recenzije : Recenzija[] = []
          this.vikendicaService.getReview(v.imeVikendice).subscribe(
            data => {
              if(data != null) {
                // recenzije = data 
                // let sum = 0
                // let count = recenzije.length
                // let avg = 0.0
                let index = 1;
                recenzije = data;

                // console.log("dohvatili smo recenzijeeeeeeeee", recenzije)
                for(let r of recenzije.sort((r1,r2) => {return r2.vremeRecenzije - r1.vremeRecenzije;})) {
                  if(r.ocena <= 2)
                    index++;
                }
                if(index > 2)
                  v.loseOcene = true
              } else {
                console.log("data null")
              }
            }
          )
        }
      }
    })
  
  }
  blockmsg = ""
  privremenoBlokiraj(v: Vikendica) {
    v.vremeBlokiranja = new Date().getTime()
    this.vikendicaService.privremenoBlokiraj(v).subscribe(data => {
      if(data != null){
        this.blockmsg = "blokirano na 48h"
        console.log("blokirano na 48h")
      }
    })
  }
  login(kor_ime: String, lozinka: String) {
    this.korService.login(kor_ime, lozinka).subscribe(data=>{
      if(data!=null){
        if(data.odobren == false) {
          this.message= "greska u sistemu ha ha"
        } else {
        this.korisnik = data
        localStorage.setItem('loginUn', this.korisnik.kor_ime);
        if(this.korisnik.tip=="admin"){
          this.admin = true
          console.log("admin panel")

        }
      }
      } else {
        this.message = "Pogresno korisnicko ime ili lozinka"
      }
    })
  }
  daMsg = ""
  deactivateAccount(k: Korisnik) {
    this.korService.deactivateAccount(k).subscribe(data => {
      if(data != 0) {
        this.daMsg = "Nalog uspesno deaktiviran."
      } else {
        this.daMsg = "Nalog neuspesno deaktiviran"
      }
    })
  }
  odobriNalog(k: Korisnik) {
    k.odobren = true;
    this.korService.updateAccountStatus(k).subscribe(data => {
      if(data != null ){
        console.log("nmp")
      }
    })
  }
  odbijNalog(k: Korisnik) {
    k.odobren = false; //u kombinaciji je nalog koji nije odobren i deaktiviran znaci da je samo neodobren zapravo, ne da ceka na zahtev
    k.nalog = 'deaktiviran';
    this.korService.updateAccountStatus(k).subscribe(data => {
      if(data != null ){
        console.log("nmp")
      }
    })
  }
  updateMessage = ""
  updateInformation(novi_korisnik : Korisnik) {
    // console.log(this.novi_korisnik.kor_ime)
    
    console.log(novi_korisnik.kor_ime)
    console.log(this.parse_profile_picture(this.novi_korisnik.profilna_slika))
    novi_korisnik.profilna_slika = this.parse_profile_picture(this.novi_korisnik.profilna_slika)
    // this.novi_korisnik.profilna_slika = 
    console.log(novi_korisnik)
    this.korService.updateInformation(novi_korisnik).subscribe(data => {
      if(data != null) {
        this.updateMessage = data
      }
    })
  }
  parse_profile_picture(profile_picture: string) {
    return profile_picture.substring(profile_picture.lastIndexOf('\\') + 1, profile_picture.length)
  }
  samePassword = false 
  samePassMsg = ""
  sameNewPasswordMsg=""
  sameNewPassword=false
  comparePasswords(oldPassword: String, newPassword: String) {
    this.samePassword = oldPassword == newPassword ? true : false
    this.samePassMsg = oldPassword == newPassword ? "Stara i nova lozinka se poklapaju" : "";
  }
  compareNewPasswords(newPassword: String, newPasswordRepeated: String) {
    this.sameNewPassword = newPassword == newPasswordRepeated ? true : false
    this.sameNewPasswordMsg = newPassword == newPasswordRepeated ? "Pogresno uneta ponovljena nova lozinka" : "";
  }
  
  isValidPassword(password: string) {
    const re = new RegExp(
      "^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*[!@#\\$%\\^&\\*\\(\\)_\\+\\-=\\{\\}\\[\\]:;\"'<>,\\.\\?/\\\\|~`]).{6,10}$"
    );
    // return re.test(password);
    if(re.test(password) == false) {
      this.passwordError = "Lozinka mora imati izmedju 6 i 10 karaktera, mora pocinjati slovom i sadrzati barem 3 mala slova, jedno veliko slovo, jedan specijalan karakter"
    } else {
      this.passwordError = ""
    }
  }
  isEmailValid(email: string) {
    const re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    this.emailError = re.test(email) == false ? "Neispravan e-mail format" : ""

  }
  isCreditCardValid(credit_card: string) {
    const visa = new RegExp("^(4539|4556|4916|4532|4929|4485|4716)[0-9]{12}$")
    const mastercard = new RegExp("^(51|52|53|54|55)[0-9]{14}$")
    const diners1 = new RegExp("^(300|301|302|303)[0-9]{12}$")
    const diners2 = new RegExp("^(36|38)[0-9]{13}$")
    if(visa.test(credit_card)) {
      this.visaKartica = true 
      this.creditCardError = ""

    } else if(mastercard.test(credit_card)) {
      this.masterCard = true 
      this.creditCardError = ""

    } else if(diners1.test(credit_card) || diners2.test(credit_card)) {
      this.dinersKartica = true 
      this.creditCardError = ""

    } else if(credit_card==""){
      this.creditCardError=""
    }else {
      this.creditCardError = "neispravan format kartice, kartica moze biti diners visa ili mastercard"
      this.dinersKartica= false 
      this.visaKartica = false 
      this.masterCard = false
    }

  }
  dimensionError: string | null = null;
  onFileSelected(event: any) {

    if(event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]
      console.log("file", this.selectedFile)

    }
  

    let formData = new FormData()
    if(this.selectedFile) {
      const img = new Image()
      const objectUrl = URL.createObjectURL(this.selectedFile)
      img.src = objectUrl;
      img.onload = () => {
        const width = img.width;
        const height = img.height;
    
        const minWidth = 100;
        const minHeight = 100;
        const maxWidth = 300;
        const maxHeight = 300;
    
        if (width < minWidth || height < minHeight) {
          this.dimensionError = `Slika je premala! Minimalna veličina je ${minWidth}x${minHeight}px.`;
        } else if (width > maxWidth || height > maxHeight) {
          this.dimensionError = `Slika je prevelika! Maksimalna veličina je ${maxWidth}x${maxHeight}px.`;
        } else {
          this.dimensionError = null;
          formData.append('file', this.selectedFile!, this.selectedFile!.name)
          console.log("form data",formData)
          this.korService.uploadFile(formData).subscribe(data => {if(data!=null) alert(data)})
          
          this.novi_korisnik.profilna_slika = this.selectedFile!.name
          console.log(this.novi_korisnik.profilna_slika)  
        }
    
        URL.revokeObjectURL(objectUrl);
      };
      
    } 
  }
  removeWhitespace(s: string) {
    return s.replace(/\s/g, "_")
  }
}
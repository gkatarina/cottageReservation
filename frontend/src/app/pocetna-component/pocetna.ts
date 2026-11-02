import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { KorisnikService } from '../services/korisnik-service';
import { Korisnik } from '../models/korisnik';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-pocetna',
  imports: [FormsModule, RouterOutlet, CommonModule, RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule],
  templateUrl: './pocetna.html',
  styleUrl: './pocetna.css'
})
export class PocetnaComponent implements OnInit {
  protected readonly title = signal('Pocetna');
  dobrodosli = "/dobrodosli"
  kor_ime=""
  lozinka=""
  message= ""
  vlasnik=false //default je kupac, mada su oba ruzna??
  router = inject(Router)
  korService = inject(KorisnikService)
  korisnik = new Korisnik()
  novi_korisnik = new Korisnik()
  //message logs 
  usernameError = ""
  passwordError = ""
  emailError = ""
  creditCardError = ""
  dinersKartica = false 
  visaKartica = false 
  masterCard = false
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  private _formBuilder = inject(FormBuilder)

  // registerForm = this._formBuilder.group({
  //   ime: ['', [Validators.maxLength(500)]],
  //   prezime: ['', [Validators.required]],
  //   pol: [Validators.required], 
  //   adresa: ['',Validators.required],
  //   telefon: ['', Validators.required]   
  // });
  isValidUsername(username: string) {
    const re = new RegExp("^([A-Za-z0-9]*[-_]*)+$")
    this.usernameError = re.test(username) == false ? "Neispravan format korisnickog imena. Korisnicko ime sme sadrzati samo slova i specijalne znakove _ i -." : ""
  }
  isValidPassword(password: string) {
    const re = new RegExp(
      "^(?=[A-Za-z])(?=(?:.*[a-z]){3,})(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\(\\)_\\+\\-=\\{\\}\\[\\]:;\"'<>,\\.\\?/\\\\|~`]).{6,10}$"
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
    this.korService.getMail(this.novi_korisnik.imejl).subscribe(data => {
      if(data == 0) {
        this.emailError = "vec postoji registrovan nalog sa ovim imejlom, pokusajte drugi"
        // return ;
      } 
    })

  }
  isCreditCardValid(credit_card: string) {
    const visa = new RegExp("^(4539|4556|4916|4532|4929|4485|4716)[0-9]{12}$")
    const mastercard = new RegExp("^(51|52|53|54|55)[0-9]{14}$")
    const diners1 = new RegExp("^(300|301|302|303)[0-9]{12}$")
    const diners2 = new RegExp("^(36|38)[0-9]{13}$")

    if(visa.test(credit_card)) {
      this.visaKartica = true 
    } else if(mastercard.test(credit_card)) {
      this.masterCard = true 
    } else if(diners1.test(credit_card) || diners2.test(credit_card)) {
      this.dinersKartica = true 
    } else {
      this.creditCardError = "neispravan format kartice, kartica moze biti diners visa ili mastercard"
      this.dinersKartica= false 
      this.visaKartica = false 
      this.masterCard = false
    }
  }
  parse_profile_picture(profile_picture: string) {
    return profile_picture.substring(profile_picture.lastIndexOf('\\') + 1, profile_picture.length)
  }
  login(kor_ime: String, lozinka: String, vlasnik: Boolean) {
    console.log(kor_ime)
    console.log(lozinka)
    this.korService.login(kor_ime, lozinka).subscribe(data=>{
      if(data!=null){
        if(data.odobren == false && data.nalog=="deaktiviran") {
          this.message = "vas zahtev za odobrenjem naloga je odbijen. pokusajte ponovo sa drugim korisnickim imenom i imejlom."
        } else if(data.odobren==false){
          this.message= "vas nalog jos nije aktiviran.."

        } else {
        this.korisnik = data
        localStorage.setItem('loginUn', this.korisnik.kor_ime);
        // localStorage.setItem('loginPass', this.korisnik.lozinka)
        if(vlasnik == false && this.korisnik.tip=="kupac")
          this.router.navigate(['/turista']);
        else if(vlasnik==true && this.korisnik.tip=="vlasnik")
          this.router.navigate(['/vlasnik']);
        else {
          this.message = "Login podaci su dobri ali niste odabrali ispravan tip korisnika.."
        }
      }
      } else {
        this.message = "Pogresno korisnicko ime ili lozinka"
      }
    })
  }
  r_muski = "" 
  r_zenski = "" 
  r_kupac = "" 
  r_vlasnik = ""
  registracijaLog = ""
  polMsg = ""
  selectedFile: File | null = null;
  register(){
    if(this.usernameError || this.emailError || this.passwordError || this.creditCardError || this.dimensionError) {
      this.registracijaLog="Ispravite neispravan unos pa pokusajte ponovo"
      return ;
    }
    
    console.log(this.r_muski)
    console.log(this.r_kupac)
    if(this.r_muski == "r_muski")
        this.novi_korisnik.pol = 'm'
    else if(this.r_zenski =='r_zenski')
        this.novi_korisnik.pol = 'z'
    else {
      this.novi_korisnik.pol = ""
      // return ;
    }
    this.novi_korisnik.pol = this.r_muski == "r_muski" ? 'm' : 'z'
    this.novi_korisnik.tip = this.r_kupac == "r_kupac" ? "kupac" : "vlasnik"
    if(this.r_kupac == "r_kupac")
      this.novi_korisnik.tip = 'kupac'
    else if(this.r_vlasnik =='r_vlasnik')
        this.novi_korisnik.tip = 'vlasnik'
    else {
      this.novi_korisnik.tip = ""
      // return ;
    }
    if(this.novi_korisnik.profilna_slika == "")
      this.novi_korisnik.profilna_slika = "default_profile_picture.png"
    if(this.novi_korisnik.adresa == "" || this.novi_korisnik.ime == "" || this.novi_korisnik.prezime == "" || this.novi_korisnik.telefon == "" || this.novi_korisnik.pol == "" || this.novi_korisnik.tip == "") {
      this.registracijaLog = "Fale podaci"
      return ;
    } else {
    this.korService.register(this.novi_korisnik).subscribe(data => {
      if(data != null) {
        this.registracijaLog = data
      }
    })}

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
}}
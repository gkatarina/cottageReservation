import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VikendicaService } from '../services/vikendica-service';
import { Vikendica } from '../models/vikendica';
import { MatFormField, MatLabel } from "@angular/material/input";
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik-service';
import { FormGroup } from '@angular/forms';
import { Rezervacija } from '../models/rezervacija';
import { ChangeDetectorRef } from '@angular/core';
import { Recenzija } from '../models/recenzija';
@Component({
  selector: 'app-turista-component',
  imports: [FormsModule, RouterLink, CommonModule, MatFormField, MatLabel, ReactiveFormsModule],
  templateUrl: './turista-component.html',
  styleUrl: './turista-component.css'
})
export class TuristaComponent implements OnInit{
  korService = inject(KorisnikService)
  korisnik = new Korisnik()
  oldPassword= ""
  newPassword=""
  newPasswordRepeated=""
  msgPass = ""
  passwordError=""
  router = inject(Router)
  kor_ime=""
  lozinka=""
  message= ""
  novi_korisnik = new Korisnik()
  neki_fajl!: File;
  //message logs 
  emailError = ""
  creditCardError = ""
  dinersKartica = false 
  visaKartica = false 
  masterCard = false
  selectedFile : File | null = null
  vikendicaService = inject(VikendicaService)
  vikendice : Array<Vikendica> = []
  rezervacije : Rezervacija[] = []
  private _formBuilder = inject(FormBuilder)
  
  stars = [1, 2, 3, 4, 5];
  hoverRating = 0;

  reviewForm = this._formBuilder.group({
    comment: ['', [Validators.maxLength(500)]],
    rating: [0, [Validators.required]]   
  });
  pocetna() {
    this.router.navigate(['/turista']);
  }
  
  izlogujSe() {
    
    this.router.navigate(['/'])

  }
  // vikendiceBezRazmaka: Array<String> = []
  ngOnInit(): void {  
    // const korisnik = new Korisnik()
    const username = localStorage.getItem('loginUn')
    console.log(username)

    if(username != null) {
      this.korService.getUser(username).subscribe(data => {
        if(data != null) {
          this.korisnik = data
          // console.log(this.korisnik.profilna_slika)
          this.vikendicaService.getReservationByName(username).subscribe(data => {
            if(data != null) {
              this.rezervacije = data
              console.log(this.rezervacije)
            }
          })
        }
      })

    }
    this.vikendicaService.getAll().subscribe(data => {
      if(data != null) {
        this.vikendice = data
        for(let v of this.vikendice) {

          this.vikendicaService.getAverageRating(v.imeVikendice).subscribe(data => {
            if(data != 0) {
              v.prosek = data
              console.log(v.prosek)
            }
          })
        }
      }
    })
  }
  
  sortirajNeopadajuce() {
    return this.vikendice.sort((v1, v2)=> {return v1.imeVikendice.localeCompare(v2.imeVikendice);})
  }
  sortirajNerastuce() {
    return this.vikendice.sort((v1, v2)=> {return v2.imeVikendice.localeCompare(v1.imeVikendice);}) //veze nemam sta koje
  }
  imeVikendice = ""
  mestoVikendice = ""
  filter = false
  filterVikendica : Array<Vikendica> = []
  pretrazi(imeVikendice: string, mestoVikendice: string) {
    this.filterVikendica = []
    console.log(imeVikendice)
    console.log(mestoVikendice)
    for(let i = 0; i < this.vikendice.length; i++) {
      if(this.vikendice[i].mesto == mestoVikendice && this.vikendice[i].imeVikendice == imeVikendice) 
        this.filterVikendica.push(this.vikendice[i])
      else if(this.vikendice[i].mesto==mestoVikendice && imeVikendice=="") {
        this.filterVikendica.push(this.vikendice[i])
      } else if(this.vikendice[i].imeVikendice==imeVikendice && mestoVikendice==""){
        this.filterVikendica.push(this.vikendice[i])
      }
    }
    this.filter = true;
    return this.filterVikendica
  }
  resetujPretragu() {
    this.filter = false 
    this.filterVikendica = []
  }
  changePassword(lozinka: String, nova_lozinka: String) {
    console.log(this.korisnik.kor_ime)
    if(this.samePassMsg != "" || this.passwordError != "")
      return ;
    this.korService.login(this.korisnik.kor_ime, lozinka).subscribe(data => {
      if(data != null ){
        this.korService.changePassword(this.korisnik.kor_ime, nova_lozinka).subscribe(async data => {
          if(data != null){
            this.msgPass = data
            await sleep(4000)
            this.router.navigate(["/"]);
          }
        })
      } else {
        this.passwordError = "neispravna ili netacna stara lozinka"
      }
    }) 
  }
  updateMessage = ""
  updateInformation(novi_korisnik : Korisnik) {
    // console.log(this.novi_korisnik.kor_ime)
    this.novi_korisnik.kor_ime = this.korisnik.kor_ime
    console.log(novi_korisnik)
    console.log(this.parse_profile_picture(this.novi_korisnik.profilna_slika))
    // this.novi_korisnik.profilna_slika = this.parse_profile_picture(this.novi_korisnik.profilna_slika) msm da mi ovo ni ne treba?
    
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
  novaRecenzija = new Recenzija()
  ostaviKomentar() {
    if(this.reviewForm.value.comment)
      this.novaRecenzija.komentar = this.reviewForm.value.comment
  }
  setRating(value: number) {
    this.reviewForm.controls['rating'].setValue(value);
  }
  resetHover() {
    this.hoverRating = 0;
  }
  messageLog = ""
  submitReview(r:Rezervacija) {
    let recenzija = new Recenzija()
    recenzija.vremeRecenzije = new Date().getTime();
    if (this.reviewForm.valid) {
      console.log(this.reviewForm.value.comment);
      console.log(this.reviewForm.value.rating)
      recenzija.imevikendice = r.imeVikendice
      if(this.reviewForm.value.comment != undefined)
        recenzija.komentar = this.reviewForm.value.comment 
      recenzija.ocena = this.reviewForm.value.rating! //ovo znamo da postoji
      recenzija.idRezervacije = r.idP
      console.log(r.idP)
      
      recenzija.vlasnik = this.korisnik.kor_ime // :/ 
      console.log(recenzija)
      this.vikendicaService.addReview(recenzija).subscribe(data => {
        if(data != null) {
          this.messageLog = data
        }
      })
      
    }
  }

  proveraVremena(datumS: Date) {
    var trenutniDatum = new Date()
    console.log(trenutniDatum.getMonth())
    var datum = new Date(datumS)
    if(trenutniDatum.getMonth() == datum.getMonth() && trenutniDatum.getFullYear() == datum.getFullYear()) {
      return (datum.getDate() - trenutniDatum.getDate() > 0) ? true : false;
    }
    return true;
  }
  obrisiRezervaciju(r: Rezervacija) {
    this.vikendicaService.cancelReservation(r).subscribe(data => {
      if(data != 0){
        this.messageLog = "uspesno otkazano"
      } else {
        this.messageLog = "neuspesno otkazano"
      }
    })
  }

}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VikendicaService } from '../services/vikendica-service';
import { Vikendica } from '../models/vikendica';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik-service';
import { Rezervacija } from '../models/rezervacija';
import { Recenzija } from '../models/recenzija';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { GalerijaUpload } from '../models/galerijaUpload';
import { MatDialog, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vlasnik-component',
  imports: [FormsModule, CommonModule, MatFormField, MatLabel, ReactiveFormsModule, FullCalendarModule, MatDialogContent, MatDialogActions],
  templateUrl: './vlasnik-component.html',
  styleUrl: './vlasnik-component.css'
})
export class VlasnikComponent implements OnInit{
  @ViewChild('rangeDialog') rangeDialog!: ElementRef<HTMLDialogElement>;  
  dialogVisible = false;
  selectedStart!: Date;
  selectedEnd!: Date;
  constructor(private dialog: MatDialog, private sanitizer: DomSanitizer) {}
  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    selectMirror: true,
    editable: true,
    select: this.handleDateSelect.bind(this),
    events: []
  };
  dialogRef :any;
  rezervZaAzuriranje = new Rezervacija();
  clickedRange : any;
  handleDateSelect(clickInfo: any) {

  const clickedDate = clickInfo.start;
  const pocetak = clickedDate;
  console.log("clicked", clickInfo.end.toISOString().split('T')[0])
  // Find which range the clicked date belongs to
  const clickedRange = this.coloredRanges.find(range =>
    clickedDate >= range.start && clickedDate <= range.end
  );
  this.clickedRange = clickedRange;
  if (clickedRange) {
    
    const found = this.rezervacije.find(x => {
      const match = toDateString(x.datumPocetka) === toDateString(clickedRange.start) &&
                    toDateString(x.datumKraja) === toDateString(clickedRange.end);
      return match; // this is key!
    });
    if(found?.aktivirano == false) {
      this.rezervZaAzuriranje = found;
      console.log(this.rezervZaAzuriranje)
      this.rangeDialog.nativeElement.showModal();

    } else {
      this.messageLog = "datumi su vec odobreni"
    }
  } else {
    console.log('Clicked outside any range');
  }
  }
  commentCalender =""
  onDeny(r: Rezervacija) {
    this.odbijRezervaciju(r);
    this.rangeDialog.nativeElement.close(); // closes dialog
    }
  onConfirm(r: Rezervacija) {
   r.komentarVlasnika = this.commentCalender;
   this.odobriRezervaciju(r);
   this.rangeDialog.nativeElement.close();
  }
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
  novaVikendica = new Vikendica()
  private _formBuilder = inject(FormBuilder)
  
  stars = [1, 2, 3, 4, 5];
  hoverRating = 0;

  reviewForm = this._formBuilder.group({
    comment: ['', [Validators.maxLength(500)]],
    rating: [0, [Validators.required]]   
  });
 
  // vikendiceBezRazmaka: Array<String> = []
  coloredRanges: {start:Date; end:Date}[] = []
  ngOnInit(): void {  
    // const korisnik = new Korisnik()
    const username = localStorage.getItem('loginUn')
    console.log(username)

    if(username != null) {
      this.korService.getUser(username).subscribe(data => {
        if(data != null) {
          this.korisnik = data
          // console.log(this.korisnik.profilna_slika)
          this.vikendicaService.getReservationByOwner(username).subscribe(data => {
            if(data != null) {
              this.rezervacije = data
              this.rezervacije = this.rezervacije.sort((v1, v2) => {
                return new Date(v2.datumKraja).getTime() - new Date(v1.datumKraja).getTime();
              });
              console.log(this.rezervacije)
              this.coloredRanges = data.map(r => ({
                start: new Date(r.datumPocetka),
                end: new Date(r.datumKraja)
              }));
              console.log("colored ranges", this.coloredRanges)
              const events = data.map(r => ({
                title: r.imeVikendice,
                start: r.datumPocetka,
                end: r.datumKraja,
                display: 'background',
                color: r.aktivirano ? '#53c43d' : '#f2e307'
              }));
              this.calendarOptions = {
                ...this.calendarOptions, 
                events                    
              };
            }
          })
        }
      })

    }

    this.vikendicaService.getAll().subscribe(data => {
      if(data != null) {
        this.vikendice = data
      }
    })
  }
  urediVikendicuValue = false;
  urediVikendicu(){
    this.urediVikendicuValue= true;
    
  }
  obrisiVikendicu(v : Vikendica){

    this.vikendicaService.deleteFromGallery(v.imeVikendice).subscribe(data => {
      if(data != 0) {
        console.log("obrisano iz galerije")
      }
    })
    this.vikendicaService.deleteReview(v.imeVikendice).subscribe(data => {
      if(data != 0) {
        console.log("obrisan review")
      }
    })
    this.vikendicaService.deleteReservation(v.imeVikendice).subscribe(data => {
      if(data != 0) {
        console.log("obrisane rezervacije")
      }
    })
    this.vikendicaService.deleteCottage(v).subscribe(data => {
      if(data != null) {
        //nista 
      }
    })
  }
  izmeniV(vikendica: Vikendica) {
    console.log(vikendica)
    this.vikendicaService.changeCottage(vikendica).subscribe(data => {
      if(data != null) {
        //nista 
      }
    })
  }
  selectedFiles: File[] = []
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    // Store selected files in an array
    this.selectedFiles = Array.from(input.files);
    console.log('Selected files:', this.selectedFiles);
  }
  imeVikendiceJSON = ""

  uploadFiles(imeVikendice: string) {

    for(let file of this.selectedFiles) {
      const formData = new FormData()
      let galerija = new GalerijaUpload()
      if(file) {
        console.log(file)
        formData.append('file', file, file.name)
        this.vikendicaService.uploadFile(formData).subscribe(data => {if(data != null) console.log(data)})
        galerija.slikaVikendice = file.name
        galerija.imeVikendice = imeVikendice
        console.log("galerija", galerija)
        this.vikendicaService.addPictures(galerija).subscribe(data => {
          if(data != null) {
            console.log("dodate slike u bazu")
          }
        })
      }
    }
  }
  selectedJson: File | null = null;
  jsonData: any; 
  novaVikendicaJson = new Vikendica()
  jsonKeys: any;
  uploadFilesJSON() {
    for(let file of this.selectedFiles) {
      const formData = new FormData()
      let galerija = new GalerijaUpload()
      if(file) {
        console.log(file)
        formData.append('file', file, file.name)
        this.vikendicaService.uploadFile(formData).subscribe(data => {if(data != null) console.log(data)})
        galerija.slikaVikendice = file.name
        galerija.imeVikendice = this.novaVikendicaJson.imeVikendice
        console.log("galerija", galerija)
        this.vikendicaService.addPictures(galerija).subscribe(data => {
          if(data != null) {
            console.log("dodate slike u bazu")
          }
        })
      }
    }
  }
  onJsonSelected(event: any) {
    this.selectedJson = event.target.files[0];
    if (this.selectedJson) {
      const fileReader = new FileReader();
      fileReader.readAsText(this.selectedJson, 'UTF-8');
      fileReader.onload = () => {
        try {
          this.jsonData = JSON.parse(fileReader.result as string);
          this.jsonKeys = Object.values(this.jsonData);
          for(let key of this.jsonKeys) {
            console.log('JSON Keys:',key);
          }
          this.novaVikendicaJson = this.jsonData[0]
          console.log(this.novaVikendicaJson)
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      fileReader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    }
  }
  dodajVikendicuJSON(){
    this.vikendicaService.addCottage(this.novaVikendicaJson).subscribe(data => {
      if(data != null) {
        console.log("uspesno dodata vikendica")
      }
    })
  }
  dodajVikendicu(vikendica: Vikendica) {
    vikendica.imeVlasnika = this.korisnik.kor_ime
    this.vikendicaService.addCottage(vikendica).subscribe(data => {
      if(data != null){
        //nista opet, ne zanima me fr
      }
    })
    // treba i slike da se dodaju... god damn...
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
  // pocetna() {
  //   this.router.navigate(['/turista']);
  // }
  
  izlogujSe() {
    
    this.router.navigate(['/'])

  }
  removeWhitespace(s: string) {
    return s.replace(/\s/g, "_")
  }
  novaRecenzija = new Recenzija() 
  messageLog = ""
 
  proveraVremena(datumS: Date) {
    var trenutniDatum = new Date()
    console.log(trenutniDatum.getMonth())
    var datum = new Date(datumS)
    if(trenutniDatum.getMonth() == datum.getMonth() && trenutniDatum.getFullYear() == datum.getFullYear()) {
      return (datum.getDate() - trenutniDatum.getDate() > 0) ? true : false;
    }
    return true;
  }
  odobriRez = ""
  odobriRezervaciju(r: Rezervacija){
    if(this.reviewForm.valid){
      console.log(this.reviewForm.value.comment)
      if(r.komentarVlasnika == "")
        r.komentarVlasnika = this.reviewForm.value.comment!
      r.aktivirano = true 
      this.vikendicaService.reviewReservation(r).subscribe(data => {
        if(data != 0){
          this.odobriRez = "rezervacija odobrena"
        } 
      })
    }
  }
  odbijRezervaciju(r: Rezervacija){
    if(this.reviewForm.valid){
      console.log(this.reviewForm.value.comment)
      r.komentarVlasnika = this.reviewForm.value.comment!
      r.aktivirano = false
      this.vikendicaService.cancelReservation(r).subscribe(data => {
        if(data != 0) {
          this.odobriRez = "odbijena rezervacija"
        }
      })
    }
  }

}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function toDateString(date: Date | string): string {
  const d = new Date(date);
  // Output like "2025-10-08"
  return d.toISOString().split('T')[0];
}
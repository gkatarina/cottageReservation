import { Component, inject, OnInit } from '@angular/core';
import { Vikendica } from '../models/vikendica';
import { VikendicaService } from '../services/vikendica-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Galerija } from '../models/galerija';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Recenzija } from '../models/recenzija';
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
@Component({
  selector: 'app-vikendica-component',
  imports: [
    RouterLink, 
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vikendica-component.html',
  styleUrl: './vikendica-component.css'
})
export class VikendicaComponent implements OnInit{
  
  constructor(private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef){}

  imeVikendice = ""
  vikendica = new Vikendica()
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  vikendicaService = inject(VikendicaService)
  galerija : String[] = []
  mapUrl!: SafeResourceUrl;
  recenzije : Recenzija[] = []
  korService = inject(KorisnikService)
  korisnik = new Korisnik()
  ukupnaCena = 0
  godina = new Date().getFullYear()
  private _formBuilder = inject(FormBuilder);
  rezervacija = new Rezervacija()

 firstFormGroup = this._formBuilder.group({
    dateRange: this._formBuilder.group({
        start: ['', Validators.required],
        end: ['', Validators.required]
      }),
    brOdraslih: [0, Validators.required],
    brDece: [0, Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    broj_kreditne_kartice: [''],
    ukupnaCena: [0,this.ukupnaCena],
    dodatneInformacije: ['']
  });
  isLinear = false;
  
  pocetna() {
    this.router.navigate(['/turista']);
  }
  
  izlogujSe() {
    
    this.router.navigate(['/'])

  }
  
  ngOnInit(): void {

    this.imeVikendice = this.route.snapshot.paramMap.get('imevikendice')!
    console.log(this.imeVikendice)
    const username = localStorage.getItem('loginUn')
    console.log(username)

    if(username != null) {
      this.korService.getUser(username).subscribe(data => {
        if(data != null) {
          this.korisnik = data
          console.log(this.korisnik.profilna_slika)
          
          // alert(data)
        }
      })
    }
    this.vikendicaService.getOne(this.imeVikendice).subscribe(data => {
      if(data != null) {
        this.vikendica = data
        // const dynamicPart = this.vikendica.linkDoMape
        // const url = `https://www.google.com/maps/embed?pb=${dynamicPart}`; //moram ovo djubre da menjam u langitudu i longitudu zato sto ce posle da bude u 
        // unosu nove vikendice tako jebem im materj a vise 
        
        const urlLanLong = `https://www.google.com/maps?q=${this.vikendica.lantitude},${this.vikendica.longitude}&z=15&output=embed`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlLanLong);
        this.vikendicaService.getReview(this.imeVikendice).subscribe(data => {
          if(data != null) {
            this.recenzije = data
            this.cdRef.detectChanges();

          }
        })
        
      }
    })

    this.vikendicaService.getPictures(this.imeVikendice).subscribe(data => {
      if(data != null){
        this.galerija = data
        console.log(data)
      }
    })

  }
  countSummerDays(start: Date, end: Date): number {
    let count = 0;
    const oneDay = 1000 * 60 * 60 * 24;
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
  
    for (let y = startYear; y <= endYear; y++) {
      const summerStart = new Date(y, 4, 1);  // May 1
      const summerEnd = new Date(y, 7, 31);   // Aug 31
  
      const overlapStart = start > summerStart ? start : summerStart;
      const overlapEnd = end < summerEnd ? end : summerEnd;
  
      if (overlapStart <= overlapEnd) {
        const days = Math.floor((overlapEnd.getTime() - overlapStart.getTime()) / oneDay) + 1;
        count += days;
      }
    }
    return count;
  }
  onDateRangeChange(startDate1: any, endDate1: any) {
    const startObj = startDate1 instanceof Date ? startDate1 : new Date(startDate1);
    const endObj = endDate1 instanceof Date ? endDate1 : new Date(endDate1);
    const startDate = startObj
    const endDate = endObj;

    const basePrice = this.vikendica.cena;     // existing base price
    const summerMultiplier = 1.2;               // +20% in summer

    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const summerDays = this.countSummerDays(startDate, endDate);
    const nonSummerDays = totalDays - summerDays;

    // compute new price
    const newPrice = (summerDays * basePrice * summerMultiplier) + (nonSummerDays * basePrice);

    // update your rezervacija object
    this.rezervacija.cena = newPrice;
    // ja cu da nastelujem da je nova cena 20 posto veca a posle cu da menjam
    console.log(`New price: ${newPrice}`);
    console.log('Start Date:', startObj);
    console.log('End Date:', endObj);
    console.log(Math.abs(endObj.getDate() - startObj.getDate())) // DAN U NEDELJI I MESEC KREEC OD NULEEEEEE
    let cena = 0;
    if(endObj.getMonth() > 3 && endObj.getMonth() < 8)
      console.log("summer", endObj.getMonth())
    this.rezervacija.cena = newPrice
    this.rezervacija.datumPocetka = startObj
    this.rezervacija.datumKraja = endObj



  }
  creditCardError = ""
  dinersKartica= false 
  visaKartica = false 
  masterCard = false

  checkCreditCard(credit_card: any ) {
    this.creditCardError = ""
    if(credit_card != '') {
    const visa = new RegExp("^(4539|4556|4916|4532|4929|4485|4716)[0-9]{12}$")
    const mastercard = new RegExp("^(51|52|53|54|55)[0-9]{14}$")
    const diners1 = new RegExp("^(300|301|302|303)[0-9]{12}$")
    const diners2 = new RegExp("^(36|38)[0-9]{13}$")

    if(!visa.test(credit_card) && !mastercard.test(credit_card) && !diners1.test(credit_card) && !diners2.test(credit_card)) {
      this.creditCardError = "neispravan format kartice, kartica moze biti diners visa ili mastercard"
      console.log(this.creditCardError)
    }
  }
  }
  rezervacijaInfo = ""
  rezervacije : Rezervacija[] = []
  available = true
  posaljiRezervaciju() {
    if(this.vikendica.vremeBlokiranja != -1) {
      if((new Date().getTime() - this.vikendica.vremeBlokiranja) / (1000 * 3600) <= 48  ){
        console.log("vikendica je blokirana sacekajte da prodje 2 dana")
        this.rezervacijaInfo = "vikendica je blokirana"
        console.log(this.rezervacijaInfo)
        return;
      }
    } 
    if(this.firstFormGroup.value.brDece != null && this.firstFormGroup.value.brOdraslih != null && this.secondFormGroup.value.broj_kreditne_kartice != null && this.secondFormGroup.value.dodatneInformacije != null) {
      this.rezervacija.brDece = this.firstFormGroup.value.brDece
      this.rezervacija.brOdraslih = this.firstFormGroup.value.brOdraslih
      this.korisnik.broj_kreditne_kartice = this.secondFormGroup.value.broj_kreditne_kartice == "" ? this.korisnik.broj_kreditne_kartice : this.secondFormGroup.value.broj_kreditne_kartice
      this.rezervacija.opis = this.secondFormGroup.value.dodatneInformacije
      this.rezervacija.korisnik = this.korisnik.kor_ime
      this.rezervacija.imeVikendice = this.vikendica.imeVikendice
      this.rezervacija.vlasnik = this.vikendica.imeVlasnika
      this.rezervacija.korisnik = this.korisnik.kor_ime
      
      console.log(this.rezervacija)
      if(this.creditCardError != "") {
        return ;
      }
      this.vikendicaService.getReservations(this.vikendica.imeVikendice).subscribe(data => {
        this.rezervacijaInfo = ""
        if(data != null){
          this.rezervacije = data
          console.log("nestop")
          this.available = this.checkAvailable(this.rezervacije, this.rezervacija.datumPocetka, this.rezervacija.datumKraja)
          if(this.available) {
            var d = new Date()
            // console.log(d > this.rezervacija.datumPocetka)

            if(this.rezervacija.datumPocetka > d) {
              this.rezervacija.arhivirano = false //ako je datum u nekoj buducnosti onda jeste aktivna rezervacija
              //trebalo bi da samo u slucaju da ispunjava ovaj uslov pustam da se upise rezervacija ali me mrzi da unosim rucno tako da nek ostane za sad

            } else {
              this.rezervacija.arhivirano = true
            }
            this.vikendicaService.createReservation(this.rezervacija).subscribe(data => {
              if(data != 0) {
                this.rezervacijaInfo = "uspesno rezervisano"
              } else {
                this.rezervacijaInfo = "neuspesno rezervisano"
              }
              console.log(this.rezervacijaInfo)

            })
            console.log("test prosao")
          } else {
            this.rezervacijaInfo = "nema slobodnih termina za ove datume, pokusati ponovo"
          }
        }
      })
      
    } 

  }
  checkAvailable(rezervacije: Rezervacija[], startDate: Date, endDate: Date) {
    for (let rezervacija of rezervacije) {

      let datumKraja = new Date(rezervacija.datumKraja)
      let datumPocetka = new Date(rezervacija.datumPocetka)
      if (!(datumKraja <= startDate || datumPocetka >= endDate)){
        console.log(rezervacija.datumKraja)
        return false;
      }
    }
    return true;
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { VikendicaService } from '../services/vikendica-service';
import { Vikendica } from '../models/vikendica';
import { Rezervacija } from '../models/rezervacija';
import { KorisnikService } from '../services/korisnik-service';
import { Korisnik } from '../models/korisnik';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-neregistrovani-component',
  imports: [FormsModule],
  templateUrl: './neregistrovani-component.html',
  styleUrl: './neregistrovani-component.css'
})
export class NeregistrovaniComponent implements OnInit{
  vikendicaService = inject(VikendicaService)
  vikendice : Array<Vikendica> = []
  rezervacije : Rezervacija[] = []
  korisnikService = inject(KorisnikService)
  korisnik = new Korisnik()
  router = inject(Router)
  brojVlasnika = 0
  brojKupaca = 0
  brojRezervacija24 = 0
  brojRezervacija30 = 0
  brojRezervacija7 = 0
  ngOnInit(): void {
    this.vikendicaService.getAll().subscribe(data => {
      if(data != null) {
        this.vikendice = data
        console.log(this.vikendice)
          this.vikendicaService.getReservationByOwner("ana_vlasnik").subscribe(data => {
            if(data != null) {
              this.rezervacije = data 

              for(let r of this.rezervacije) {
                let datumPrijave = new Date(r.datumRezervacije)
                let datum = new Date()
                let result = (datum.getTime() - datumPrijave.getTime())/(1000*3600*24)
                if(result == 0) {
                  this.brojRezervacija24++;
                } else if(result >=1  && result <= 7 ) {
                  this.brojRezervacija7++;
                } else if(result <= 30) {
                  this.brojRezervacija30++;
                }
              }
            }
          })
        
      }}
    )
   
      this.korisnikService.getCount("kupac").subscribe(data => {
      if(data != null) {
        this.brojKupaca = data 
      }
    })
    this.korisnikService.getCount("vlasnik").subscribe(data => {
      if(data != null) {
        this.brojVlasnika = data 
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
  pocetna() {
    this.router.navigate(['/'])
  }
  

  
}

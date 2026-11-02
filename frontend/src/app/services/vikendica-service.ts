import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Vikendica } from '../models/vikendica';
import { Galerija } from '../models/galerija';
import { Recenzija } from '../models/recenzija';
import { Rezervacija } from '../models/rezervacija';
import { GalerijaUpload } from '../models/galerijaUpload';

@Injectable({
  providedIn: 'root'
})
export class VikendicaService {
  http = inject(HttpClient)
  // korisnikModel = new Korisnik()
  vikendicaModel = new Vikendica()

  getAll() {
    return this.http.get<Vikendica[]>("http://localhost:8080/cottage/getAllCottages")
  }
  getOne(imevikendice: string) {
    console.log(imevikendice)
    return this.http.get<Vikendica>(`http://localhost:8080/cottage/getOne/${imevikendice}`)
  }
  getPictures(imevikendice: string) {
    return this.http.get<String[]>(`http://localhost:8080/gallery/name/${imevikendice}`)
  }
  getReview(imevikendice: string) {
    console.log("vikendica", imevikendice)
    return this.http.get<Recenzija[]>(`http://localhost:8080/reviews/getReview/${imevikendice}`)
  }
  createReservation(r: Rezervacija) {
    return this.http.post<number>("http://localhost:8080/reservations/newReservation", r)
  }
  getReservations(reservation: string) {
    // reservation = reservation.replace(' ', '_')
    return this.http.get<Rezervacija[]>(`http://localhost:8080/reservations/getReservations/${reservation}`)

  }
  getReservationByName(korisnik: string) {
    // reservation = reservation.replace(' ', '_')
    return this.http.get<Rezervacija[]>(`http://localhost:8080/reservations/getReservationByName/${korisnik}`)

  }
  getReservationByOwner(vlasnik: string) {
    // reservation = reservation.replace(' ', '_')
    console.log(vlasnik)
    return this.http.get<Rezervacija[]>(`http://localhost:8080/reservations/getReservationByOwner/${vlasnik}`)

  }
  addReview(r: Recenzija) {
    console.log(r)
    return this.http.post("http://localhost:8080/reviews/addReview", r, {responseType: "text"})

  }
  cancelReservation(r: Rezervacija) { //rezervacije SIGURNO treba da imaju svoj servis
    return this.http.post<number>("http://localhost:8080/reservations/cancelReservation", r)

  }
  // reviewReservation
  reviewReservation(r: Rezervacija) { //rezervacije SIGURNO treba da imaju svoj servis
    return this.http.post<number>("http://localhost:8080/reservations/reviewReservation", r)

  }
  changeCottage(v: Vikendica) {
    return this.http.post("http://localhost:8080/cottage/changeCottage", v)
  }
  deleteCottage(v: Vikendica) {
    return this.http.post("http://localhost:8080/cottage/deleteCottage", v)
  }
  addCottage(v: Vikendica) {
    return this.http.post("http://localhost:8080/cottage/addCottage", v)

  }
  uploadFile(formData: FormData) {
    console.log(formData, "service gallery")
    return this.http.post("http://localhost:8080/gallery", formData, {responseType: 'text'});
  }
  addPictures(g: GalerijaUpload) {
    console.log("galerija upload", g)
    return this.http.post("http://localhost:8080/gallery/addPictures", g)
  }
  privremenoBlokiraj(v: Vikendica) {
    return this.http.post("http://localhost:8080/cottage/ban", v)
  }
  getAverageRating(imevikendice: string) {
    console.log("vikendica", imevikendice)
    return this.http.get<number>(`http://localhost:8080/reviews/getAverageRating/${imevikendice}`)
  }
  deleteFromGallery(imeVikendice: string) {
    return this.http.post<number>("http://localhost:8080/gallery/deleteFromGallery", imeVikendice)
  }
  deleteReservation(imeVikendice: string) {
    return this.http.post<number>("http://localhost:8080/reservations/deleteReservation", imeVikendice)
  }
  deleteReview(imeVikendice: string) {
    return this.http.post<number>("http://localhost:8080/reviews/deleteReview", imeVikendice)

  }
}

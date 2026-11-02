import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  http = inject(HttpClient)
  korisnikModel = new Korisnik()

  login(username: String, password: String) {
      return this.http.post<Korisnik>("http://localhost:8080/users/login", {username: username, password: password})
  }
  register(korisnik: Korisnik) {
    return this.http.post("http://localhost:8080/users/register", korisnik, { responseType: 'text' });
  }
  getUser(username: String) {
    return this.http.post<Korisnik>("http://localhost:8080/users/getUser", username);
  }
  changePassword(username: String, newPassword: String) {
    // console.log(oldPassword, newPassword)
    return this.http.post("http://localhost:8080/users/changePassword", {username: username, newPassword:newPassword}, { responseType: 'text' });
  }
  updateInformation(korisnik: Korisnik) {
    console.log("service")
    console.log(korisnik)
    return this.http.post("http://localhost:8080/users/updateInformation", korisnik, {responseType: 'text'})
  }
  uploadFile(formData: FormData) {
    console.log(formData, "servi9ce")
    return this.http.post("http://localhost:8080/upload", formData, {responseType: 'text'});
  }
  // getCount/{tip}
  getCount(tip: string) {
    return this.http.get<number>(`http://localhost:8080/users/getCount/${tip}`)
  }
  deactivateAccount(k: Korisnik) {
    return this.http.post("http://localhost:8080/users/deactivateAccount", k)
  }
  getUsers() {
    return this.http.get<Korisnik[]>("http://localhost:8080/users/getUsers")
  }
  updateAccountStatus(k: Korisnik) {
    return this.http.post("http://localhost:8080/users/updateAccountStatus", k)
  }
  getMail(mail: String) {
    return this.http.get<number>(`http://localhost:8080/users/getMail/${mail}`)

  }
}

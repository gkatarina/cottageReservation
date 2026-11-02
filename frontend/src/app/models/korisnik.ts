export class Korisnik {
    constructor(
        public kor_ime: string = "",
        public lozinka: string ="",
        public ime: string = "",
        public prezime: string ="",
        public pol: string ="",
        public adresa: string ="",
        public telefon: string ="",
        public imejl: string ="",
        public profilna_slika: string ="",//link do slike
        public broj_kreditne_kartice: string ="", //morace da prati odredjene uslove...bro..
        public tip: string ="", //vlasnik ili kupac
        public odobren: boolean = false,
        public nalog: string = "aktiviran",
        public expanded?: boolean
    ){}

}

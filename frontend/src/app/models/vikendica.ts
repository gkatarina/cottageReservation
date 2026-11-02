export class Vikendica {
    // razmisljam da li da model ovde prati bekend ili da 
    // imam listu stringova za recenzije i galeriju jer to jeste neprirodno cuvati u odvojenim klasama
    // jer je ovo vise za nosql baze tj podaci su te prirode
    constructor(
      
       public imeVikendice: string = "",
       public mesto: string = "",
       public telefon: string = "", 
       public usluge: string="",
       public imeVlasnika: string="",
       public cena: number = 0,
       public galerijaSlika: Array<String> = [],
       public lantitude: number = 0.0,
       public longitude: number = 0.0,
       public idV: number = 0, //katastrofa
       public cenaLeti: number = 0,
       public vremeBlokiranja: number = -1,
       public loseOcene: boolean = false,
       public prosek: number = 0.0
    ){}

}

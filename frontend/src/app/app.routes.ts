// // import { Routes } from '@angular/router';

// // export const routes: Routes = [];
// import { Routes } from '@angular/router';

// // Uvoz komponenti sa tačnim putanjama iz tvog stabla
// import { PocetnaComponent } from './pocetna-component/pocetna';
// import { VikendicaComponent } from './vikendica-component/vikendica-component';
// import { VlasnikComponent } from './vlasnik-component/vlasnik-component';

// export const routes: Routes = [
//   // Početna stranica kada se otvori localhost:4200
//   { path: '', component: PocetnaComponent },
//   { path: 'pocetna', component: PocetnaComponent },
//   { path: 'vikendica', component: VikendicaComponent },
//   { path: 'vlasnik', component: VlasnikComponent },

//   // Preusmeravanje nepoznatih adresa na početnu
//   { path: '**', redirectTo: '' }
// ];

import { Routes } from '@angular/router';
import { TuristaComponent } from './turista-component/turista-component';
import { VlasnikComponent } from './vlasnik-component/vlasnik-component';
import { PocetnaComponent } from './pocetna-component/pocetna';
import { VikendicaComponent } from './vikendica-component/vikendica-component';
import { NeregistrovaniComponent } from './neregistrovani-component/neregistrovani-component';
import { AdminComponent } from './admin-component/admin-component';
import { AdminLoginComponent } from './admin-login-component/admin-login-component';


export const routes: Routes = [
    {path: '', component: PocetnaComponent},
    {path: 'turista', component: TuristaComponent},
    {path: 'vlasnik', component: VlasnikComponent},
    {path: 'vikendica/:imevikendice', component: VikendicaComponent},
    {path: 'dobrodosli', component: NeregistrovaniComponent},
    {path: 'admin', component: AdminLoginComponent},
    {path: 'adminPanel', component: AdminComponent}
];

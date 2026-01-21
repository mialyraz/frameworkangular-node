import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { UtilisateurComponent } from './administration/utilisateur/utilisateur.component';
import { GestionMenuComponent } from './administration/gestion-menu/gestion-menu.component';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionAffectationComponent } from './administration/gestion-affectation/gestion-affectation.component';



const routes: Routes = [
  { path: '', component: AppComponent , data: {titreComponent : 'Gestion des carrières'}},
  { path: 'accueil', component: AccueilComponent , data: {titreComponent : 'Gestion des carrières'}},
  { path: 'users', component: UtilisateurComponent, data: {titreComponent : 'Gestion d\'utilisateur'}},
  { path: 'gestion-menu', component: GestionMenuComponent, data: {titreComponent : 'Gestion des affections'}},
  { path: 'gestion-affectation', component: GestionAffectationComponent, data: {titreComponent : 'Gestion de menu'}},
  { path: '**', pathMatch: 'full', component: Page404Component, title: '404 Page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }  



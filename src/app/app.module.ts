import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Page404Component } from './page404/page404.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilisateurComponent } from './administration/utilisateur/utilisateur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GestionMenuComponent } from './administration/gestion-menu/gestion-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './services/filter/filter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { LoadPageComponent } from './load-page/load-page/load-page.component';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { GestionAffectationComponent } from './administration/gestion-affectation/gestion-affectation.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    UtilisateurComponent,
    GestionMenuComponent,
    FilterPipe,
    LoadPageComponent,
    AccueilComponent,
    GestionAffectationComponent
  ],
  imports: [
    MatButtonModule,
    Ng2SearchPipeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgbModule,
    ButtonModule,
    ChipsModule,
    ToastModule,
    TableModule,
    TagModule,
    InputNumberModule
  ],
  providers: [ConfirmationService, MessageService, { provide: LOCALE_ID, useValue: 'fr-FR' },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

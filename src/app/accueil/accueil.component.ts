import { Component, OnInit } from '@angular/core';
import { CryptageService } from '../services/cryptage/cryptage.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(
    private cryptage: CryptageService,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    let data_crypted = this.cookies.get('data_utilisateur')
    let data_decrypted = this.cryptage.decryptValue(data_crypted)
    let data = JSON.parse(data_decrypted)
    console.log(data)
  }

}

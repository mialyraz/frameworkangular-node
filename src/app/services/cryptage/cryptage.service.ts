import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CryptageService {

  constructor() { }

  key:any = "secretKey"

  encryptEncode(value: any): string {
    const encrypted = CryptoJS.AES.encrypt(typeof(value) == "object" ? JSON.stringify(value) : value, this.key).toString();  
    const base64 = btoa(encrypted)  
    return this.base64UrlEncode(base64)
  }

  encryptValue(value: any): string {
    return CryptoJS.AES.encrypt(typeof(value) == "object" ? JSON.stringify(value) : value, this.key).toString();  
  }

  decryptDecode(encryptedValue: string): string {
    const base64 = this.base64UrlDecode(encryptedValue)
    const encrypted = atob(base64)
    const bytes = CryptoJS.AES.decrypt(encrypted, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  decryptValue(encryptedValue: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  base64UrlEncode(base64: string): string {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  base64UrlDecode(base64Url: string): string {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    return base64;
  }


}

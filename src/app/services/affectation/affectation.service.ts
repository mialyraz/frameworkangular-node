import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalApiUrlService } from '../global-api-url.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http:HttpClient, private url:GlobalApiUrlService) { }
   REST_API = "http://localhost:3000";


  getAllProcessus(){
    var API_URL = this.url.REST_API+'/get-all-proc';
    return this.http.get(API_URL, {})
  } 
  getLigneByProccessus(processusName: any){
    var API_URL = this.url.REST_API+'/get-ligne-by-process';
    return this.http.post(API_URL, {processusName}, httpOptions)
  } 

  getInfoWithMatricule(matricule: any){
    var API_URL = this.url.REST_API+'/get-info-with-matricule';
    return this.http.post(API_URL, {matricule}, httpOptions)
  } 
  addNewAffectation(personel ,processus, sous_processus, niveau){
    var API_URL = this.url.REST_API+'/insert-affectation';
    return this.http.post(API_URL, {personel ,processus, sous_processus, niveau}, httpOptions)
  } 
  getAllAffectation(){
    var API_URL = this.url.REST_API+'/get-all-affectation';
    return this.http.get(API_URL, {})
  } 
  getAffectationByProcess(processus: any){
    var API_URL = this.url.REST_API+'/get-affectation-by-processus';
    return this.http.post(API_URL, {processus}, httpOptions)
  } 


}

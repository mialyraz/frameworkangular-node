import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table'
import { Toast } from 'primeng/toast';
import { PrimengService } from 'src/app/services/primeng/primeng.service';
import { InputTextModule } from 'primeng/inputtext';
import { AffectationService } from 'src/app/services/affectation/affectation.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CryptageService } from 'src/app/services/cryptage/cryptage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gestion-affectation',
  templateUrl: './gestion-affectation.component.html',
  styleUrls: ['./gestion-affectation.component.css']
})
export class GestionAffectationComponent implements OnInit {

  selectedOptionType:any='N+1'
  selectedProcessus: any = "";
  selectedSousProcessus:any=""
  selectedProcessusName: string;
  processusList: any= [];
  sousProcessusList:any=[]

  matriculeRes:any=""
  nomRes:any=""
  fonctionRes:any=""
  mailRes:any=""
  affectationList:any=[]
  data = [
    { processus: 'Processus 1', sousProcessus: 'Sous 1', niveau: 'N+1', matricule: 'Auto1', nom: 'Auto Nom1', fonction: 'Manager', email: 'email1@ex.com' },
    { processus: 'Processus 2', sousProcessus: 'Sous 2', niveau: 'Collaborateur', matricule: '123', nom: 'Dupont', fonction: 'Développeur', email: 'dupont@ex.com' }
  ];
  constructor(private toastPrimeng: PrimengService,private toast: ToastService,private router:Router, private cryptageService:CryptageService, private affectationServ: AffectationService) {
    sessionStorage.setItem('currentUrl', this.cryptageService.encryptValue(this.router.url))
   }

  ngOnInit(): void {
    this.getAllProc()
    this.getAllAffectation()
  }

  getAllProc() {
  this.affectationServ.getAllProcessus().subscribe(
    (data: any) => {
      this.processusList = data.map((p: any) => {
        let processusCorrect = this.fixEncoding(p.processus);

        if (processusCorrect === 'DSI') {
          processusCorrect = 'Infra-Tech';
        }

        return { ...p, processus: processusCorrect };
      });

      // Supprimer les doublons exacts sur le nom du processus
      this.processusList = this.processusList.filter((p, index, self) =>
        index === self.findIndex(t => t.processus === p.processus)
      );

      console.log('proc', this.processusList);
    }
  );
  }

  fixEncoding(str: string): string {
    try {
      return decodeURIComponent(escape(str));
    } catch {
      return str; // si erreur, retourne original
    }
  }

  addNewCollaborateur(){

  }

  addNewResponsable(){
    console.log("test",this.matriculeRes,this.selectedProcessus, this.selectedSousProcessus);
    const personnel ={
      matricule: this.matriculeRes,
      nom:this.nomRes,
      fonction:this.fonctionRes,
      email:this.mailRes
    }
    const personnelJson = JSON.stringify(personnel, null, 2);
    console.log('json',personnelJson);
    
   
    
    this.affectationServ.addNewAffectation(personnelJson,this.selectedProcessus,this.selectedSousProcessus,this.selectedOptionType).subscribe(
      (data:any)=>{
        this.toast.Success("ok")
      },(error)=>{
        this.toast.Error("error")
      }
    )
  }

  getAllAffectation(){
    this.affectationServ.getAllAffectation().subscribe(
      (data:any)=>{

        this.affectationList=data
        console.log("data",data);
        
      },(error)=>{
        this.toast.Error("error")
      }
    )
  }
  resetFormType(){

  }

  setViewMode(option){
    this.selectedOptionType=option
  }
  onProcessusChange(): void {
    console.log("processus",this.selectedProcessus);
    
    if (!this.selectedProcessus) {
      this.sousProcessusList = [];
      this.selectedSousProcessus = '';
      return;
    }

    // Si le processus est 'Infra-Tech', on le renomme en 'DSI' avant l'appel
    let processusName = this.selectedProcessus === 'Infra-Tech' ? 'DSI' : this.selectedProcessus;

    this.affectationServ.getLigneByProccessus(processusName).subscribe(
      (res: any) => {
        if (!res || res.length === 0) {
        // Aucun résultat : on crée un objet par défaut
        this.sousProcessusList = [{ id_ligne: '', libelle: this.selectedProcessus }];
      } else {
        this.sousProcessusList = res;
      }

        console.log(processusName, this.sousProcessusList.length, res);
      },
      (err) => {
        console.error('Erreur lors de la récupération des lignes:', err);
      }
    );
  }

  onSousProcessusSelect(){

  }

  getInfoWithMatricule(){
    this.affectationServ.getInfoWithMatricule(this.matriculeRes).subscribe(
      (data:any)=>{
        this.nomRes=data[0].nom
        this.fonctionRes=data[0].fonction
        this.mailRes=data[0].email
        console.log("data",data,this.nomRes);
        
      }
    )
      
  }
  preventFormSubmission($event){
    console.log("matr",this.matriculeRes);
    this.getInfoWithMatricule()
  }
  rows: any[] = [{}]; // une ligne par défaut

  addRow() {
    this.rows.push({});
  }

  removeRow(index: number) {
    if (this.rows.length > 1) {
      this.rows.splice(index, 1);
    }
  }

}

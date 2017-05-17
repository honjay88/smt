import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
//import { NavController,Modal } from 'ionic-angular';

import { MaterialSlot } from './materialSlot';
import { MaterialNo } from './materialSlot';

import { MaterialSlotService } from './materialSlot.service';
import { ToastController } from 'ionic-angular';
import { MlotDataPage } from './MlotDetail';
import { TranslateService } from 'ng2-translate';
//import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';
//import {CacheService} from '../../shared/service/CacheService'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MaterialSlotService]
})
export class HomePage implements OnInit {
  @ViewChild('c') MslInput;
  @ViewChild('b') InputData;

  public wo1: string;
  public ma1: string;
  public Mslno: string;
  value = '';
  message = '';
  greeting = '';
  lotcolor = 1;

  vibration: boolean = false;

  public materialSlots: MaterialSlot[];
  public materialSlots2: MaterialSlot[];
  public materialNos: MaterialNo[];
  constructor(private translate: TranslateService, public modalCtrl: ModalController, public navCtrl: NavController,//private cacheService:CacheService,
    private _materialSlotService: MaterialSlotService, private toastCtrl: ToastController)//,
  // public user:User, public auth:Auth) 
  {console.log(3);
    
    //  this.wo1 ="h33333333333333hh";
    // this.ma1 ="h33333333333333hh";
    this._materialSlotService.getMaterialNos().then(h => this.materialNos = h); 
   // this._materialSlotService.getMaterialNos().then(h => this.materialSlots = h);
    this.message = 'Login';
    this.translate.get(this.message).subscribe(res => { this.message = res });
    console.log(this.message);
  }

  logout() {
    // this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }



  openModal(item: any) {
    console.log(item);
    let modal = this.modalCtrl.create(MlotDataPage, item);
    this.greeting = "";
    modal.onDidDismiss(() => {
      this.greeting = "onDismiss was called";
    });
    modal.present();
  }


  getMaterialSlots(): void {
     this._materialSlotService.getMaterialSlots().then(h => this.materialSlots = h);
  }
  ngOnInit() {
    this.getMaterialSlots();
  }

  ionViewDidEnter() {
    console.log(`ionViewDidEnter`);

    //this.cacheService.get('vibration').then((val) => {
    //   this.vibration = <boolean>val.value;
    //  console.log( "setup:"+this.vibration );
    // })

    setTimeout(() => {
      this.MslInput.setFocus();
    }, 150);
  }

  onData(value: string) {
    var index = this.materialSlots.findIndex(d => d.sSlot == value);
    console.log("ff" + index);
    if (index > -1) {
      this.materialSlots[index].sLot = (index > -1) ? value : "";
      this.materialSlots[index].sCheck = (index > -1) ? true : false;
      this.materialSlots[index].sColor = (index > -1) ? 2 : this.lotcolor;
      this.message = "Success";
    }
    else {
      this.message = "fail";
    }
    console.log("\"" + this.message + "\"");
    this.translate.get(this.message).subscribe(res => { this.message = res });


    //  this.showToast('middle',this.message);
    //this.value = value;
    console.log(index);
    console.log(this.materialSlots);
  }


  onMSL(Mslno: string) {
    console.log(Mslno);
    this.Mslno = Mslno;
    console.log(this.materialNos);
    console.log(this.Mslno);
  
    console.log(this.materialNos);
    var index = this.materialNos.findIndex(d => d.sMsl == Mslno.trim());
    console.log(index);
    if (index == -1) {
      this.Mslno = '';
      this.wo1 = '';
      this.ma1 = '';
      this.message = "fail";
    }
    else {
      this.wo1 = this.materialNos[index].sWo;
      this.ma1 = this.materialNos[index].sMachine;
      this.message = "Success";
      console.log(`ionViewDidEnter`);
      this.materialSlots2 = this.materialSlots.filter(d => d.sMsl == Mslno.trim());
      setTimeout(() => {
        this.InputData.setFocus();
      }, 150);
    }
    this.translate.get(this.message).subscribe(res => { this.message = res });
    console.log(this.Mslno);
  }

  showToast(position: string, sMessage: string) {
    let toast = this.toastCtrl.create({
      message: sMessage,
      duration: 2000,
      position: position
    });
    toast.present(toast);



  }


}

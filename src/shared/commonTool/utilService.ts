import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
//import {CacheService} from '../../shared/service/storage/CacheService'; 

@Injectable()
export class UtilService {

    constructor(private toastCtrl: ToastController){//,private cacheService:CacheService) {

        console.log('yy');

 /*          let hasLang = this.cacheService.get('lang');
    
    hasLang.then((val) => {
    if( val == null)
       this.cacheService.set('lang', 'tw');
      
    }).catch((error) => { 
                 console.log('error', error);
     }).then((m) => {

   
    });*/
     }

    presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    }
}
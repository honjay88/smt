import { Component ,OnInit} from '@angular/core';
import { NavController,App } from 'ionic-angular'; 
import {Langs} from './mock-lang';
import { LoginPage } from '../login/login';
import { TranslateService } from 'ng2-translate';
//import { Observable } from 'rxjs'; 
//import {CacheService} from '../../shared/service/storage/CacheService';
import {LocalStorage} from 'ng2-webstorage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage  implements OnInit{ 

  @LocalStorage() 
  lang:any;
  @LocalStorage() 
  alert:boolean;
  @LocalStorage() 
  vibrate:boolean;
  @LocalStorage() 
  notify:boolean;
  
 // selected: String;
  isVibrationToggled :any;
  isNotifyToggled :any;
  isAlertToggled :any;
 // lang :any;
  Language :any;

  constructor(private translate: TranslateService,private navCtrl: NavController,private app:App){//,private cacheService:CacheService) {
     console.log(4); 
     
    /* this.Language =Langs; 
     console.log(this.Language);
     if(localStorage.getItem('lang') == null)
     {
         localStorage.setItem('lang', 'tw'); 
     } 
     if(localStorage.getItem('alert') == null)
     {
         localStorage.setItem('alert', 'false');     
     } 
     if(localStorage.getItem('vibrate') == null)
     {
         localStorage.setItem('vibrate', 'false');   
     }    
     if(localStorage.getItem('notify') == null)
     {
         localStorage.setItem('notify', 'false');  
     } */  

     this.Language =Langs; 
     console.log(this.Language);
     this.lang = this.lang ==null?'tw':this.lang;
     this.alert = this.alert ==null?false:this.alert;
     this.vibrate = this.vibrate ==null?false:this.vibrate;
     this.notify = this.notify ==null?false:this.notify;

     //this.lang = localStorage.getItem('lang');
     this.isAlertToggled = this.alert;
     this.isVibrationToggled =this.vibrate;
     this.isNotifyToggled = this.notify;
  }
  ngOnInit() {
      // this.cacheService.get('vibration').then((val) => {
     //   this.isToggled =<boolean>val.value;
     //   console.log( "setup:"+this.isToggled );
   //  })
   }

  notifyAction(value) {
   //  if(this.vibration != !this.vibration)
    // {
     console.log("Toggled: "+ this.isNotifyToggled); 
   //  localStorage.setItem('notify', value._checked);
     this.notify = value._checked;
      this.isNotifyToggled = value._checked;
     //    this.storage.set('vibration', this.vibration);
   //  }
  }

 alertAction(value)
 {
     console.log(value._checked);
    console.log("Toggled: "+ this.isAlertToggled); 
   // localStorage.setItem('alert', value._checked); 
     this.alert = value._checked;
    this.isAlertToggled = value._checked;
 }

 vibrationAction(value) {
   //  if(this.vibration != !this.vibration)
    // {
     console.log("Toggled: "+ this.isVibrationToggled); 
  //   localStorage.setItem('vibrate', value._checked); 
    this.vibrate = value._checked;
     this.isVibrationToggled = value._checked;
     //    this.storage.set('vibration', this.vibration);
   //  }
  }
 logout() {
   // this.auth.logout();
    //this.navCtrl.popToRoot();
    this.app.getRootNav().setRoot(LoginPage);
 }
 onLangSelected(value) { 
      this.lang = value;  
     // localStorage.setItem('lang', value); 
      this.translate.use(value);
	}

}

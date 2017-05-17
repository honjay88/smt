import { Component, ViewChild ,OnInit} from '@angular/core';
import { Platform, AlertController,NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';//Push

import { TabsPage } from '../pages/tabs/tabs';
//import { Observable } from 'rxjs'; 
import { TranslateService } from 'ng2-translate';
//import { PushInfoPage } from '../pages/pushInfo/pushInfo'; 
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../shared/service/Auth/Auth.service';
//import { Auth } from '@ionic/cloud-angular'; 
//import { CacheService } from '../shared/service/storage/CacheService';
import { PingService } from '../shared/service/apiService/PingService';
 //import {ConfigService} from '../shared/service/Common/config';
 import {LocalStorage} from 'ng2-webstorage';
 //import {CategoryService} from '../shared/service/storage/CategoryService';
//import {ViewEncapsulation} from '@angular/core';
@Component({
  templateUrl: 'app.html',
  //styleUrls: ['./bootstrap.scss'],
 // encapsulation: ViewEncapsulation.None
})
export class MyApp implements OnInit {
  //  rootPage = TabsPage;
  @ViewChild('Nav') nav: NavController;
  @LocalStorage() 
  lang:any;


  rootPage: any;
  message: any;
  ping :any;
  theme:any;
  constructor(private translate: TranslateService,private alertCtrl:AlertController, private platform: Platform, 
              public auth: AuthService//, private cacheService: CacheService
              ,private _pingService: PingService){//,private configService:ConfigService){//,private catservice :CategoryService){
             // ,private navController: NavController ) {
 
    console.log(1);
    let dd ='DD';
    console.log(dd.toLowerCase());
   // console.log('2'+configService.getConfig('lang'));
    //console.log('3'+configService.setConfig('lang','tw'));
     //this.cacheService.set('lang', 'tw');

   // this.cacheService.get('vibration').then((val) => {
   //   console.log("myapp:" + <boolean>val.value);
   // })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.initTranslation();
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.message = 'Login';
      this.translate.get(this.message).subscribe(res => { this.message = res });
      console.log(this.message);

      if (this.auth.isAuthenticated()) {
        this.rootPage = TabsPage;
        console.log("11111");
      }
      else {
        this.rootPage = LoginPage;
        console.log("222222");
      }

    });
  }

  ngOnInit() {
    console.log(11); 
    
  }
   
   
  
  initTranslation() { 
    //this.cacheService.get('lang');
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(fr|en|es|in|tw)/gi.test(userLang) ? userLang : 'tw';
    console.log('start');
    console.log('start sqlite');
    this.lang = this.lang ==null?userLang:this.lang;
 /* if(localStorage.getItem('lang') == null)
       localStorage.setItem('lang', userLang);
  else
      userLang =localStorage.getItem('lang'); */
   //console.log(localStorage.getItem('lang'));    
    this.translate.setDefaultLang(userLang); 
    this.translate.use(userLang);


  /*  var subscription = this.cacheService.get('lang');
       console.log(new Date());
subscription.then(x => {
   console.log(x);
  if(x ==null)
  {  
        this.cacheService.set('lang', userLang);
  }
  else
  {
      // userLang = x.;
       console.log(x);

  } 
      this.translate.setDefaultLang(userLang); 
      this.translate.use(userLang);
}, 
error => console.error(error));*/

    // this.translate.setDefaultLang(userLang); 
   //   this.translate.use(userLang);
      console.log('end sqlite');
/*var subscription = Observable.fromPromise(this.cacheService.get('lang'));
      console.log(new Date());
subscription.subscribe(x => {
   console.log(x);
  if(x ==null)
  {  
        this.cacheService.set('lang', userLang);
  }
  else
  {
       userLang = <string>x;
       console.log(x);

  } 
      this.translate.setDefaultLang(userLang); 
      this.translate.use(userLang);
}, 
error => console.error(error));*/
console.log('end sqlite');
   /*let hasLang = this.cacheService.get('lang');
    hasLang.then((val) => { 
      if(val == null)
         this.cacheService.set('lang', userLang);
     else
         userLang = <string>val.value;
    }).catch((error) => { 
         console.log('error', error);
     }).then((m) => {

     //  this.nav.push(LoginPage, { userLang: userLang });
    });*/
  /*    console.log('hasLang:'+hasLang);
    if( hasLang == null)
       this.cacheService.set('lang', userLang);
    else
       userLang = hasLang;
    console.log('end');*/
   // this.cacheService.set('lang', 'en');
 
    // this language will be used as a fallback when a translation isn't found in the current language 
    /*this.cacheService.get('lang').then((val) => {
        console.log('1-3');
        if( val == null)
        {         
           this.cacheService.set<string>('lang', userLang); 
        }
        else
        { 
           userLang =  <string>val.value; 
        } 

         console.log('1-4');
         console.log(userLang);
        
    } )*/
/*console.log('start sqlite');
console.log('ddddddddddddddddddd'+this.catservice.getData('lang'));
if(this.catservice.getData('lang')==false)
{
         var dd= this.catservice.setData('lang','tw');
         console.log('dd'+dd);
}*/
   /*   this.catservice.setValue('lang',userLang)
        .then((data) => {
          console.log('Success', data);                                   // lists all category, then we switch to
        }, (error) => {
          console.log('Error', error);
        });
*/
  //      this.translate.setDefaultLang(userLang); 
    // the lang to use, if the lang isn't available, it will use the current loader to get them
  //  this.translate.use(userLang);
   // console.log('userLang:'+userLang)
   // this.configService.lang = userLang;


   
   //  this.nav.push(LoginPage, { userLang: userLang });
    
     console.log('1-455555555555');
  }

  

  /*initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    let push = Push.init({
      android: {
        senderID: "YOUR_SENDER_ID"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    });

    push.on('registration', (data) => {
      console.log("device token ->", data.registrationId);
      //TODO - send device token to server
    });
    push.on('notification', (data) => {
      console.log('message', data.message);
      let self = this;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              self.nav.push(PushInfoPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        self.nav.push(PushInfoPage, { message: data.message });
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);
    });
  }*/


}

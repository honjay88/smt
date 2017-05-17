import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController,AlertController, NavParams, LoadingController, Platform,ToastController,MenuController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
//import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
//import { Auth } from './Auth.service';
//import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
//import { User } from './user';  
//import { Vibration } from 'ionic-native'; 
import { HttpService } from '../../shared/service/apiService/httpService';
import { AuthService } from '../../shared/service/Auth/Auth.service';
import { IUrlOptions, RequestTypes } from '../../shared/service/apiService/httpMethod';
import { NotificationService } from '../../shared/service/localNotification/notificationService';
import { Broadcaster } from 'ionic-native';
import { PingService,ServerEvent } from '../../shared/service/apiService/PingService';
//import {CacheService} from '../../shared/service/storage/CacheService'; 
//import { Headers } from '@angular/http';
import { Headers } from '@angular/http';
//import { TagService } from '../../shared/service/Common/switch';
import {Langs} from '../../pages/about/mock-lang';
//import { ConfigService } from '../../shared/service/Common/config';
//import {CategoryService} from '../../shared/service/storage/CategoryService';
//import { Observable } from 'rxjs'; 
import {UtilService} from '../../shared/commonTool/utilService';
import {LocalStorage} from 'ng2-webstorage';
import CryptoJS from 'crypto-js';
 
declare var require: any;
declare var Buffer: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html' 
})

export class LoginPage implements OnInit {
  @ViewChild('c') InputID;
  //private barcodeText: String;
  //private barcodeFormat: String;

  public Langs1:any; 
  showLogin: boolean = true;
  id: string = '';
  password: string = '';
  name: string = '';
  usercreds: any;
  message: any;
  vibration: boolean = false;
  public requestResult: any;
  accessToken: any;
  ping: any;

  @LocalStorage() 
  lang:any;

  dbConn:any;
  Result :any;
  ResultHTTPStatus :any;
 // private pings;

  constructor(private platform: Platform, private translate: TranslateService, public navCtrl: NavController, public auth: AuthService,// public user: User,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, private odata: HttpService, private localNotify: NotificationService
    //, private tagService: TagService
    , private _pingService: PingService,public toastCtrl: ToastController, private menu: MenuController,
    private utilService:UtilService,
 //   private cacheService: CacheService, 
    //private configService:ConfigService, 
    private navParams: NavParams){
 //   ,private catservice :CategoryService) {
    console.log(2);
    this.te();
    this.menu.enable(true); 
    this.usercreds = {
      id: '',
      password: '',
      name: ''
    }
      this.Langs1 =Langs; 
    //  console.log(navParams.data);
   //   this.langm = navParams.get('userLang'); 
    //  console.log('hh'+this.configService.lang);
      // this.langm=this.catservice.getData('lang');
     //   this.cacheService.get('lang').then((val) => {
     //         this.langm =  <string>val.value;
           //   console.log("this.langm:"+this.langm);
      //    })
     // this.langm = this.cacheService.get('lang'); 
      //this.cacheService.get('lang').then((val) => {
        //this.langm =localStorage.getItem('lang');
     console.log('login load ' +this.lang);
       //});
   
 /*       setTimeout(() => { 
     var subscription = Observable.fromPromise(this.cacheService.get('lang')).catch(
                (error, obs) => Observable.empty() 
                               .concat(obs.delay(1000))
                 );
       console.log(new Date());
subscription.subscribe(x => {console.log(x);
 this.langm = x.value;
}
,error => console.error(error));
console.log('end sqlite2');
         }, 500);*/

  /*       var x =this.cacheService.get('lang',500);
         console.log(x);
         this.langm = x;*/
           console.log('end sqlite2');
  }
  //function myFunction(sencond:number): void { 
  //    Vibration.vibrate(sencond);  
  //};

  uploadImage() {
    var filename = "llll";// this.lastImage;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
    // headers.append('Access-Control-Allow-Origin', '*');

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename },
      headers: headers
    };
    let urlOptions: IUrlOptions = <IUrlOptions>{};
    urlOptions.restOfUrl = "/api/values/PostImage";
    this.odata.Request(RequestTypes.post, urlOptions, "fff", options).subscribe(
      data => this.requestResult = data,
      error => alert(error)
    );
    // alert(this.base64Image);
  }


  private te() {
   
     this._pingService.pingTest();
     this._pingService.pingStream.subscribe(ping => {
          this.ping = <ServerEvent>ping;
          this.utilService.presentToast(this.ping.Data);
          this.dbConn = this.ping.Res; 
    })
      
  }

	onLangSelected(value) { 
   /*   this.configService.setConfig('lang',value);
      this.langm = value;
      console.log('langm:'+this.langm); 
      console.log('now:'+this.configService.getConfig('lang'));*/
     // alert('gg');
     //  this.configService.lang =value;
      this.lang = value;
      console.log('lang:'+value); 
  //     this.cacheService.set('lang',value);
     // this.cacheService.renmove<string>('lang');
    // this.cacheService.set<string>('lang', value); 
     // localStorage.setItem('lang', value);
     
      this.translate.use(value);
   //  this.configService.setConfig('lang',value);
	}
  

   testGet2() {
       const headers = new Headers(); 
      // headers.append('Accept-Encoding', 'gzip'); 
     //  headers.append('Access-Control-Expose-Headers', 'x-crypt-type');
    //   var options = { 
  //       headers: headers
     //  };
       var options = {  
          headers: headers
       };
       
        let urlOptions: IUrlOptions = <IUrlOptions>{};
        urlOptions.restOfUrl = "/api/value/ping";
        this.odata.Request(RequestTypes.get, urlOptions,options) 
        .subscribe( 
            data => { this.requestResult = data
                     // this.Result= (data.json());
                      //this.Result = JSON.parse(data.toString());
                     // this.ResultHTTPStatus =this.Result.HTTPStatus;
                      console.log(this.requestResult);
            },
            error => alert(error)
        ); 
    }
  testGet() {

    if (this.dbConn !='OK')
   {
        alert('尚未連線');
   }
   else 
   {
    this.auth.login2(this.id, this.password).then((msg) => {
      if (msg) {
        console.log('dd' + msg);
      }
    });
   }
    // this.tagService.todos.subscribe(function(value) {
    //	console.log("pp"+value);});

 
 //////////////   this.tagService.sub();

    //    this.tagService.todos.subscribe((options:any)=>{
    //     console.log("out"+options);
    //  })
    //   this.tagService.tagListSubject.subscribe((options:any)=>{
    //    alert("out"+options);
    //	})
    /* const headers = new Headers();
     let querydata = 'grant_type=password&username=' + this.id + '&password=' + this.password;
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     let urlOptions: IUrlOptions = <IUrlOptions>{};
     urlOptions.restOfUrl = "/token";
     let options = new RequestOptions({     
         headers: headers
       }); 
       console.log(querydata);
     this.odata.Request(RequestTypes.post, urlOptions,querydata, options).subscribe(
         (data) => { this.requestResult = data,
                     this.accessToken = this.requestResult.access_token; 
                     console.log(this.accessToken);
               },
           error => alert(error)
       );*/
  }
  OpenBarcode1() {
    alert('快束兩下');
  }
  select(input: any) {

    console.log(input);
  }
  OpenBarcode() {
    this.platform.ready().then(() => {
      BarcodeScanner.scan().then((result) => {
        if (!result.cancelled) {
          this.id = result.text;

          setTimeout(() => {
            this.InputID.setFocus();
          }, 150);


          /*updateList(ev) {
           console.log(ev.target.value);
          // doScan(){
               console.log('scannig product barcode');
                 this.platform.ready().then(() => {
                     BarcodeScanner.scan().then((result) => {
                         if (!result.cancelled) {
                   this.id = result.text;
         
          setTimeout(()=>{
            this.InputID.setFocus();
           }, 150);*/
          //			this.barcodeFormat = result.format;
        }
        else {
          this.id = '';
        }
      }, (error) => {
        console.log('error when scanning product barcode');
        this.id = '';
      });
    });
    //}*/
  }
ionViewWillEnter() {  
 console.log('ionViewWillEnter');
  
}  


  ngOnInit() {
      //  this.langm = <string>val.value;
    

    Broadcaster.addEventListener('eventName');


    //this.cacheService.get('vibration').then((val) => {
    //     this.vibration = <boolean>val.value;
    // console.log( "setup:"+this.vibration );
    // })
    /*
        
         this.message='Login';
    this.translate.get(this.message).subscribe(res => {this.message = res});
        console.log("sss"+this.message);
                 this.message='Login';
    
      this.translate.get(this.message).subscribe(res => {
          console.log("Result: " + res);
        });      
    */
  }
  ionViewDidLoad() {

    // this.cacheService.get('vibration').then((val) => {
    //          this.vibration = <boolean>val.value;
    //      console.log( "setup:"+this.vibration );
    //   })
    // console.log('Hello LoginPage Page'); 
  }
  /*
  for both of these, if the right form is showing, process the form,
  otherwise show it
  */

  alertMeaasge(): void {
    let alert = this.alertCtrl.create({
      title: 'Register Error',
      subTitle: 'All fields are rquired',
      buttons: ['OK']
    });
    alert.present();

    Broadcaster.fireNativeEvent('eventName', {}).then(
      () => {
        console.log('success');
        this.localNotify.oneceSchedule();
      }
    );
  }

  doLogin() {
   if (this.dbConn !='OK')
   {
        alert('尚未連線');
        return;
   }
 

    if (this.showLogin) {
      console.log('process login');

      if (this.id === '' || this.password === '') {

        this.alertMeaasge();

        if (this.vibration)
        //  Vibration.vibrate(2000);

        //this.CallVibration(2000);
        //  this.vibration = true;
        console.log("3" + this.vibration);
        return;
      }

      let loader = this.loadingCtrl.create({
        content: "Logging in..."
      });
      loader.present();


      this.usercreds = {
        id: this.id,
        password: this.password,
        name: ''
      }


      //this.auth.login('basic', this.usercreds).then((data) => {
      this.auth.login('basic', this.usercreds).then((data) => {
        if (data) {
          console.log('ok i guess?');
          loader.dismissAll();
          this.navCtrl.setRoot(TabsPage);
        }
        else {
          loader.dismissAll();
          let errors = "Login Error";
          let alert = this.alertCtrl.create({
            title: 'Login Error',
            subTitle: errors,
            buttons: ['OK']
          });
          alert.present();
          return;
        }
      }, (err) => {
        loader.dismissAll();
        console.log(err.message);

        let errors = err.message;
        //if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        //  if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

        let alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: errors,
          buttons: ['OK']
        });
        alert.present();
      });
    }
    else {
      this.showLogin = true;
    }
  }
  /*
    doRegister() {
      if(!this.showLogin) {
        console.log('process register');
  
        
        if(this.name === '' || this.email === '' || this.password === '') {
          let alert = this.alertCtrl.create({
            title:'Register Error', 
            subTitle:'All fields are rquired',
            buttons:['OK']
          });
          alert.present();
          return;
        }
  
        let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name};
        console.log(details);
        
        let loader = this.loadingCtrl.create({
          content: "Registering your account..."
        });
        loader.present();
  
        this.auth.signup(details).then(() => {
          console.log('ok signup');
          this.auth.login('basic', {'email':details.email, 'password':details.password}).then(() => {
            loader.dismissAll();
            this.navCtrl.setRoot(HomePage);
          });
  
        }, (err:IDetailedError<string[]>) => {
          loader.dismissAll();
          let errors = '';
          for(let e of err.details) {
            console.log(e);
            if(e === 'required_email') errors += 'Email is required.<br/>';
            if(e === 'required_password') errors += 'Password is required.<br/>';
            if(e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
            //don't need to worry about conflict_username
            if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
          }
          let alert = this.alertCtrl.create({
            title:'Register Error', 
            subTitle:errors,
            buttons:['OK']
          });
          alert.present();
        });
       
      } else {
        this.showLogin = false;
      }
    }
     */
    testGet6() {
                var txtUserName = '\"Pong\"';
                var key = CryptoJS.enc.Utf8.parse('8080808080808080');  
                var iv = CryptoJS.enc.Utf8.parse('8080808080808080');  
  
                var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(txtUserName), key,  
                {  
                    keySize: 128 / 8,  
                    iv: iv,  
                    mode: CryptoJS.mode.CBC,  
                    padding: CryptoJS.pad.Pkcs7  
                });   
                encrypted ='3Qh67GJkbtc/AM1oYDNoXKJhr2FlW/TOIlKuDFUjSSk=';
                console.log('encrypted: ' + encrypted);
                var decrypted = CryptoJS.AES.decrypt(encrypted.ciphertext.toString(CryptoJS.enc.Base64), key,  
                {  
                    keySize: 128 / 8,  
                    iv: iv,  
                    mode: CryptoJS.mode.CBC,  
                    padding: CryptoJS.pad.Pkcs7  
                }); 
                console.log('decrypted: ' + decrypted.toString(CryptoJS.enc.Utf8));
    }

    testGet7()
    {
        var zlib = require('zlib');
        var tmp = 'H4sIACwjAVkA/1MKyM9LVwIArndlHQYAAAA='; 
        var buffer = new Buffer(tmp, 'base64');
       // var inflate = new zlib.Inflate(buffer);
       // var output = inflate.decompress();
       zlib.gunzip(buffer, function(err, dezipped) {
        var json_string = dezipped.toString('utf-8');
        var json = JSON.parse(json_string);
         console.log(json);
        // Process the json..
      });
         
    }
    
    
testGet5() {
   var dd = 'PdBszVGl+10=';
   this.requestResult = this.decryptByDES(dd,'sblw-3hn8-sqoy19');
    console.log(this.requestResult);
}

  private decryptByDES(ciphertext, key) {
  var options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7//,
 //   iv:CryptoJS.enc.Utf8.parse('01234567')
  };
var textWordArray =CryptoJS.enc.Utf8.parse("true");
var keyHex = CryptoJS.enc.Utf8.parse(key);
var encrypted = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, options);
var base64String = encrypted.toString();
console.log('base64: ' + base64String + '\n');

var decrypted = CryptoJS.TripleDES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(base64String)
}, keyHex, options);
console.log('decrypted: ' + decrypted.toString(CryptoJS.enc.Utf8));


//    console.log(ciphertext);
 // var keyHex = CryptoJS.enc.Hex.parse(key);
 //   var decrypted = CryptoJS.TripleDES.decrypt({
  //  ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
   
  //}, keyHex, options);
  //console.log('decrypted: ' +  decrypted.toString(CryptoJS.enc.Utf8));//.toString(CryptoJS.enc.Utf8));
    /*    var codeBytes = this.DataType.base64To16Bytes(ciphertext); // 将base64加密的数据转化为Uint8Array的byte数组
       
        var keyBytes = this.DataType.hexTo16Bytes(key); // 密钥，16bytes 
        codeBytes = this.u8array.parse(codeBytes); // 数据解析
        keyBytes = this.u8array.parse(keyBytes); // 数据解析
        var encrypted = CryptoJS.TripleDES.decrypt(codeBytes, keyBytes, {
            mode:  CryptoJS.mode.ECB, // 需要导入CryptoJS的ecb.js
            padding: CryptoJS.pad.Pkcs7, // 需要导入CryptoJS的nopadding.js
        });
          return encrypted.tostring(); */
   }
 


  u8array = {
    stringify: function (wordArray) {
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var u8 = new Uint8Array(sigBytes);
        for (var i = 0; i < sigBytes; i++) {
            var byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            u8[i]=byte;
        }
        return u8;
    },

    parse: function (u8arr) {
        var len = u8arr.length;
        var words = [];
        for (var i = 0; i < len; i++) {
            words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
        }
        return CryptoJS.lib.WordArray.create(words, len);
    }
};
      

   DataType = {
    base64To16Bytes: function(b64) {
        var binary = atob(b64);
        var length = binary.length;
        var bytes = new Uint8Array(16);
        for (var i = 0, j = 2; j < length; i++, j++) {
            // Ignore the top 2 bytes(0x01, 0x08)
            bytes[i] = binary.charCodeAt(j);
        }
        return bytes;
    },

    hexTo16Bytes: function(hex) {
        var bytes = new Uint8Array(16);
        for (var i = 0, j = 0; i < hex.length; i+=2, j++) {
            var substr = hex.substring(i, i+2);
            bytes[j] = parseInt(substr, 16);
        }
        return bytes;
    },

    binaryToString: function(bytes) {
        var result = '';
        for (var i = 0; i < bytes.length; i++) {
            result += String.fromCharCode(bytes[i]);
        }
        return result;
    },

    binaryToHexString: function(bytes) {
        var result = '';
        for (var i = 0; i < bytes.length; i++) {
            var hex = (bytes[i] & 0xff).toString(16);
            hex = hex.length === 1 ? '0' + hex : hex;
            result += hex;
        }
        return result.toUpperCase();
    }
  }
}

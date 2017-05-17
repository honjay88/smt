import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';

import {HttpService} from '../../shared/service/apiService/httpService';

import { IUrlOptions,RequestTypes } from '../../shared/service/apiService/httpMethod';  
import { Headers,RequestOptions } from '@angular/http';  
import { TranslateService } from 'ng2-translate';

declare var cordova: any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  lastImage: string = null;
  loading: Loading;
  public requestResult: any;
  public base64Image: any;
  private cancel:any ='Cancel';
  private usecamera:any ='UseCamera';
  private loadphoto:any ='LoadPhoto';
  private selectPhoto:any ='SelectPhoto';
  //cordova.file.dataDirectory
  public dir:string ='file:///storage/emulated/0/Android/data/com.ionicframework.mesapp422571/cache/';
  constructor( private translate: TranslateService,private odata: HttpService,public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) { 
 console.log(5);
  this.translate.get(this.cancel).subscribe(res => { this.cancel = res });
  this.translate.get(this.loadphoto).subscribe(res => { this.loadphoto = res });
  this.translate.get(this.usecamera).subscribe(res => { this.usecamera = res });
  this.translate.get(this.selectPhoto).subscribe(res => { this.selectPhoto = res });
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.selectPhoto,
      buttons: [
        {
          text: this.loadphoto,
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: this.usecamera,
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        { 
          text:this.cancel,
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
//this.lastImage='file:///storage/emulated/0/Android/data/com.ionicframework.mesapp422571/cache/jpeg-home.jpg';
  }


  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      allowEdit : false,
      encodingType: Camera.EncodingType.JPEG, 
      destinationType : Camera.DestinationType.FILE_URI,
      correctOrientation: true
    };

  
    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } 
      else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
     //   alert(correctPath+'@@'+currentName)
      } 
     // alert("filepath="+imagePath);
    }, 
    
    (err) => {
      this.presentToast('Error while selecting image.');
    });
  }
 

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, this.dir, newFileName).then(success => {
      this.lastImage = newFileName;
      alert('create:'+this.lastImage);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
     // alert('2targetPath:'+cordova.file.dataDirectory + img);
      return this.dir+img;
      //cordova.file.dataDirectory + img;
    // return 'file:///storage/emulated/0/Android/data/com.ionicframework.mesaoo422571/cache/Speed-50.png';
    }
  }
 
 public uploadImage() {
    // var targetPath = this.pathForImage(this.lastImage);
    // alert('1targetPath:'+targetPath);
    //cordova.file.dataDirectory  
      var filename = this.lastImage;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('fileKey', 'jpeg');
      headers.append('fileName', filename); 
     // headers.append('Access-Control-Allow-Origin', '*');
     /*   var options = {
         fileKey: "file",
         fileName: filename,
         chunkedMode: false,
         mimeType: "multipart/form-data", 
         params: { 'fileName': filename },
         headers: headers
        };*/

      //   let params: URLSearchParams = new URLSearchParams();
        //     params.set('username', 'ggg' );
       //      params.set('password', 'yyy' );
    
       // alert(cordova.file.dataDirectory);
       alert(this.dir+filename); 
          do
          {
                var temp = false;
                File.readAsDataURL(this.dir, filename).then((imgData) => {
                console.log('Image Data', imgData);
                if(imgData =='undefined')
                {
                   alert('undefined');
                  temp = false;
                }
                else
                {
                      alert('base64Image');
                this.base64Image =imgData;
                  temp =true;
                }
              }).catch((error) => { 
                 console.log('error', error);
                 temp =false;}); //Logs error {"code":1,"message":"NOT_FOUND_ERR"}
          }
          while (temp != false);

          alert(this.base64Image);

         let options = new RequestOptions({       
        //  search: params, 
         // body: this.base64Image,
          headers: headers
        });
        
        let urlOptions: IUrlOptions = <IUrlOptions>{};
        urlOptions.restOfUrl = "/api/values/PostImage";
        this.odata.Request(RequestTypes.post, urlOptions,this.base64Image,options).subscribe(
            data => this.requestResult = data,
            error => alert(error)
        );

        alert('Success');
 } 

  public uploadImage1() {
    // Destination URL
    var url = "http://yoururl/upload.php";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename }
    };

    const fileTransfer = new Transfer();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }


}

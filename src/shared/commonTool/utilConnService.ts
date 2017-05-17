import { Injectable } from '@angular/core'; 
import CryptoJS from 'crypto-js';
declare var require: any;
declare var Buffer: any;

@Injectable()
export class UtilConnService { 
    constructor(){ }
    private _result :any = {};
    private _result2 :any = {};
    private decryptByDES(ciphertext) { 
      var key = CryptoJS.enc.Utf8.parse('8080808080808080');  
      var iv = CryptoJS.enc.Utf8.parse('8080808080808080'); 
      var decrypted = CryptoJS.AES.decrypt(ciphertext.toString(CryptoJS.enc.Base64), key,  
      {  
             keySize: 128 / 8,  
             iv: iv,  
             mode: CryptoJS.mode.CBC,  
             padding: CryptoJS.pad.Pkcs7  
      }); 
      //    console.log('decrypted:'+decrypted.toString());
      return decrypted.toString(CryptoJS.enc.Base64); 
   }

   public decryptCheck(cryptType,ciphertext) { 
    // console.log('ciphertext:'+ ciphertext); 
         if(cryptType!=null)
         {
              if(cryptType=='AES')
              {
                 this._result = this.decryptByDES(ciphertext); 
               //  console.log(res);
              }
              else
              {
                   //Observable.throw('not support');
                 throw new Error('error');
              }
         }
         else
         { 
             this._result = ciphertext;  
         } 
         return this._result;  
   }

   public encodeCheck(encodeType,cryptType,ciphertext) {  
     // console.log('encodeType:'+encodeType);
     // console.log('cryptType:'+cryptType);
      //console.log('ciphertext:'+ciphertext);
      this._result2 = ciphertext;
      if(encodeType!=null)
      {
           if (cryptType == null)
           {
                return this._result2;
           }

           if(encodeType=='gzip')
           {    
                var zlib = require('zlib');
                var buffer = new Buffer(ciphertext, 'base64');
                var contents = zlib.gunzipSync(buffer);
              //  console.log(contents.toString('utf-8'));
                return contents.toString('utf-8');
           }
           else if(encodeType=='deflate')
           {
                var zlib = require('zlib');
                var buffer = new Buffer(ciphertext, 'base64');
                zlib.Deflate(buffer, function(err, dezipped) { 
                    return dezipped.toString('utf-8'); 
                });   
           } 
           else
           {
                throw new Error('error');
           }
      }
      else
      { 
           if (cryptType == null)
           {
              return this._result2;
           }
           else
           {
              var buffer = new Buffer(this._result2, 'base64');
              return buffer.toString('utf-8');
           }
      } 
   }
}
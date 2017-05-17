import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';
//import { Cache } from './Cache';
//import { Observable } from 'rxjs';
@Injectable()
export class CacheService {
 //   private storage: Storage;  
    constructor() {
        console.log('1-6');
       // this.storage = new Storage(); 
    }

  /*  set<T>(key: string, value: T) {
        this.storage.set(key, new Cache<T>(value));
    }*/

   /* delay<T>(millis: number, value?: T): Promise<T> {
      return new Promise((resolve) => setTimeout(resolve(value), 100))
    }*/

  /*  get<T>(key: string,timeout: number = 0): Promise<T> { 
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.storage.get(key).then((data) => {
                  resolve(data.value);
            }).catch(error => {
                reject('nil');
            })
              },timeout);
        }); 
     */
   //  let example = Observable.fromPromise(this.storage.get(key).then((data)=> data.value)).do(() => console.log('Do Something!')).publish(); 
  /*  var res = setTimeout(() => {
       this.storage.forEach.get(key).then((data)=> data.value);
     },timeout);
     return res;*/
   //  return example;  
     

       //  console.log('res:'+res);
        // return  res;//(new Cache<any>(res)).value;
        //return  this.storage.get(key);
        /*    console.log('1-7');
       return new Promise((resolve, reject) => {
            this.storage.get(key).then((data) => {
                resolve(data);
            }).catch(error => {
                reject('nil');
            })
        }); */
       // return this.storage.get(key);
   
  /*  renmove<T>(key: string): Promise<Cache<T>> {
            console.log('1-7');
       return new Promise((resolve, reject) => {
            this.storage.remove(key).then((data) => {
                resolve(data);
            }).catch(error => {
                reject('nil');
            })
        }); 
       // return this.storage.get(key);
    }*/


    
 
}
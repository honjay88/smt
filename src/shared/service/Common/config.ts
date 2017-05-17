import { Injectable } from '@angular/core';
import { CacheService } from '../storage/CacheService';
import {Platform,Config} from 'ionic-angular';
 

@Injectable()
export class ConfigService {   
    public lang:any;
    constructor(private plt: Platform,private cacheService: CacheService,private config: Config) { 
       console.log('ini'+this.config.get('lang'));
       if(this.config.get('lang') == null)
       {
           this.config.set('lang','tw');  
       } 
        console.log('ConfigService load');
        console.log('ConfigService get1 '+config.get('lang'));
        console.log(config.get('menuType'));

   
     }
     
     public getConfig(param:any):any
     {
         console.log(param);
         console.log('ConfigService get2 '+this.config.get(param));
         return this.config.get(param); 
     }  
     public setConfig(param:any,param2:any):void
     {
         this.config.set(param,param2); 
     } 


    
}
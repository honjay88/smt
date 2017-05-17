import { Http } from '@angular/http'; 
import { HttpService } from './httpService'; 
//import { UtilConnService } from '../../commonTool/utilConnService'; 
//import {CacheService} from '../storage/CacheService';
//import { ReflectiveInjector } from '@angular/core';

export function ProviderService(url: string) {
    /* if(url.length ==0)
     { 
          let injector = ReflectiveInjector.resolveAndCreate([CacheService]);
       //   var self =(injector.get(CacheService));
        //  self.set("url", "http://127.0.0.1"); 
        //  self.get('url').then((val) => { 
        //  url = val.value;
        //  console.log("url:"+val.value);
         // })
     }
     else
     {
          this.url="http://127.0.0.1";  
     }
     console.log("url:"+this.url);*/
     return {
        provide: HttpService, useFactory: (http) => {
            return new HttpService(url, http);
        },
        deps: [Http]
    }
}
 
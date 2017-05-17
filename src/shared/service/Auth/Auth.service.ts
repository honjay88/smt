 
import {Injectable} from '@angular/core';
import {User} from '../../../pages/login/user';
//import {Users } from '../../../pages/login/mock-user'; 
import {UserService} from '../../../pages/login/user.service';

import { Headers,RequestOptions } from '@angular/http';   
import { IUrlOptions,RequestTypes } from '../apiService/httpMethod';  
import {HttpService} from '../apiService/httpService';
import {LocalStorage} from 'ng2-webstorage';
//import {OptionsModel} from '../Common/switch';
//import {TagService} from '../Common/switch';
//import {CacheService} from '../storage/CacheService'; 
 
@Injectable()
export class AuthService {
  @LocalStorage() 
  token :any;
  Response :any;
  public requestResult: any;
  accessToken :any;
 
  public Users:User[];
 // userSubject: Subject<Object> = new ReplaySubject<Object>(1);
  constructor(private _user:UserService,private odata: HttpService,//private cacheService: CacheService
  //private tagService: TagService
  )
  { 
      this._user.getUsers().then(h => this.Users = h);
      this.Response = {
            Status: '',
            Message: ''
        }           
  }

  login2(id:string,password:string)
  {
      const headers = new Headers();
      let querydata = 'grant_type=password&username=' + id + '&password=' + password;
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlOptions: IUrlOptions = <IUrlOptions>{};
      urlOptions.restOfUrl = "/token";
      let options = new RequestOptions({     
          headers: headers
        }); 
        console.log(querydata);
        this.odata.Request(RequestTypes.post, urlOptions,querydata, options).subscribe(
          (data) => { this.requestResult = data; 
                        this.token = { 
                                       accessToken: this.requestResult.access_token,
                                       refreshToken: this.requestResult.refresh_token 
                                    }; 
                      //this.cacheService.set('AuthToken', token); 
                   //   this.userSubject.next(token);
                   //   this.tagService.tagListSubject.next(token);
                     /// this.tagService.register(token);//.//.next(Object.assign({}, token));
                      //console.log(token);
                },
                error => alert('lll'+error)
        ); 

       return new Promise(resolve => {resolve(true);  });
  }
  isAuthenticated()
  {
     return  false;
  }

  login(type:any,user:any)
  {
     if(type ='basic')
     {
        var check = this.Users.findIndex(d=>d.sID == user.id && d.sPassword == user.password);  
        if (check>-1)
        {
          //   this.Response = {
          //   Status: 'Success',
          //   Message: 'Login OK'
          // }
          console.log(":1"+check);
             return new Promise(resolve => {resolve(true);
    
        });

      }
      else
      {  console.log("2:" + check);
             return new Promise(resolve => {resolve(false);  });

      }
     }

    return new Promise(resolve => {resolve(false);  });
  } 

}

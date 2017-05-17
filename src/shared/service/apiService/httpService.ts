import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable,Scheduler } from 'rxjs'; 
import { IUrlOptions,RequestTypes } from './httpMethod'; 
import { ReflectiveInjector } from '@angular/core';
import { UtilConnService } from '../../commonTool/utilConnService'; 
 

@Injectable()
export class HttpService {
    utilConnService: UtilConnService;
    constructor(
        private host: string,
        private http: Http//,
       // private utilConnService:UtilConnService 
    ){  
       let injector: any = ReflectiveInjector.resolveAndCreate([UtilConnService]);
       this.utilConnService = injector.get(UtilConnService); 
     //   console.log('Same instance?', this.utilConnService === injector.get(UtilConnService));
    } 

    private constructUrl(urlOptions: IUrlOptions): string {
        return this.host + urlOptions.restOfUrl;
    } 

    //T specifies a generic output of function
    public Request<T>(requestType: RequestTypes, urlOptions: IUrlOptions, body?: any, options?: RequestOptionsArgs) : Observable<T> {
        let response: Observable<Response>;
        
        //True in case of post, put and patch
        if (body && options) {
            response = this.http[RequestTypes[requestType]](
                this.constructUrl(urlOptions), 
                body, 
                options).subscribeOn(Scheduler.async).observeOn(Scheduler.async);
        }
        //True in case of post, put and patch if options is empty
        else if (body) {
            response = this.http[RequestTypes[requestType]](
                this.constructUrl(urlOptions),
                body).subscribeOn(Scheduler.async).observeOn(Scheduler.async);
        }
        //True in case of get, delete, head and options
        else if (options) {
            response = this.http[RequestTypes[requestType]](
                this.constructUrl(urlOptions),
                options).subscribeOn(Scheduler.async).observeOn(Scheduler.async);
        }
        //True in case of get, delete, head and options, if options is empty
        else {
            response = this.http[RequestTypes[requestType]](
                this.constructUrl(urlOptions),
                options).subscribeOn(Scheduler.async).observeOn(Scheduler.async);
        }
        //console.log(response.map((res) => <T>res.json()));
      
        return response.timeout(6000)//, new Error('Timeout has occurred.'))
        .map((res) => { 
              var headers = res.headers; 
              var cryptType = headers.get('x-crypt-type');
              var result :any;
               
              result = this.utilConnService.decryptCheck(cryptType,res.text()); 
              //console.log(result);
              var encodeType = headers.get('x-encoding');  
              result =this.utilConnService.encodeCheck(encodeType,cryptType,result); 
              //console.log(result);
              result = <T>JSON.parse(result); 
              return result;
        }) 
        .retry(2)
        .catch(this.handleError);
    }
    private handleError (error: any) {
     //      var errorObject = JSON.parse(error._body);
         //  console.log(errorObject); // log to console instead
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }  
}
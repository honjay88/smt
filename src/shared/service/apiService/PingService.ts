import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Headers, RequestOptions } from '@angular/http'; 
 

export class ServerEvent { 
    ServerName: string;
    Timestamp: Date;
    Data: any; 
    Res :string;

    constructor(servername:string,data:any,res:string) {
        this.Timestamp = new Date();
        this.ServerName =servername;
        this.Data = data;
        this.Res = res;
    }
}


@Injectable()
export class PingService {
    pingStream: Subject<ServerEvent> = new Subject<ServerEvent>();
    options: any;
   // ping: number = 0;
    url: string = "http://192.168.99.1:39876/api/value/get";

    constructor(private _http: Http) {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        this.options = new RequestOptions({
            headers: headers
        });

    }
    
    pingTest() {
        this.pingStream = new Subject<ServerEvent>();
         let cnt =0;
         Observable.interval(1500).take(3)
            .subscribe((data) => {
                let timeStart: number = performance.now();
                this._http.get(this.url, this.options) 
                    .timeout(60000)//, new Error('Timeout has occurred.'))
                    .map((res) => <string>res.json())
                    .retry(1) 
                    .catch(this.handleError)
                    .subscribe((data) => {
                        let timeEnd: number = performance.now();

                        let ping: number = timeEnd - timeStart;
                      //  this.ping = ping;
                       // this.utilService.presentToast(ping.toFixed(3) + ' ms');
                        //      pings.push(ping.toFixed(3)+' ms');
                          this.pingStream.next(new ServerEvent('ap',ping.toFixed(3)+' ms','OK'));
                          
                    }, error => {
                        //   this.pingStream.next(0);
                        //this.utilService.presentToast(0 + ' ms');
                          this.pingStream.next(new ServerEvent('ap',0 + ' ms','NG'));
                        console.log(error);
                        ++cnt;
                        console.log('g'+cnt);
                    }, () => {
                        console.log('over'+cnt);
                    });
            }); 
    } 

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :  error.status ? `${error.status} - ${error.statusText}` : error.error;
        if(error.status ==0)
        {
            errMsg = 'Connect Server Error';
        }
        //console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
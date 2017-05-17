import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
//import { HttpService } from './httpService';
//import {CacheService} from '../storage/CacheService';
//import { ReflectiveInjector } from '@angular/core';

@Injectable()
export class HttpfactoryService {

    constructor(
        private host: string,
        private http: Http
    ) { }

}
 
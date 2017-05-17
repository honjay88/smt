/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform } from 'ionic-angular';
import { ConfigMock, PlatformMock } from '../../mocks';
import { LoginPage }  from './login';
//import {describe, it, afterEach, beforeEach, expect} from 'angular2/testing';
import {Http} from '@angular/http';
import {TranslateModule,TranslateLoader} from 'ng2-translate/ng2-translate';
import {TranslateLoaderFactory} from '../../app/TranslateLoaderFactory';
import {UserService} from '../../pages/login/user.service'; 
import { HttpService } from '../../shared/service/apiService/httpService'; 
import { IonicErrorHandler } from 'ionic-angular';
import { ErrorHandler } from '@angular/core';
export function HttpService2(http: Http) {
   return   new HttpService("http://192.168.99.1:39876", http);
}
let fixture: ComponentFixture<LoginPage> = null;
let instance: any = null;

describe('LoginPage: LoginPage', () => {

  // demonstration on how to manually compile the test bed (as opposed to calling TestUtils)
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        App, DomController, Form, Keyboard, MenuController, NavController,
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
        UserService
       ,{provide: ErrorHandler, useClass: IonicErrorHandler},
       {provide: HttpService, useFactory: HttpService2, deps: [Http]},
      ],
      imports: [
        FormsModule,
        IonicModule, 
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
            deps: [Http] 
        }),
        ReactiveFormsModule,
      ], 
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginPage);
      instance = fixture;
      fixture.detectChanges();
    });
  }));

  /*afterEach(() => {
    fixture.destroy();
  });*/

  /*it('should create LoginPage', () => {
    //expect(fixture).toBeTruthy();
    //expect(instance).toBeTruthy();
  });
});*/


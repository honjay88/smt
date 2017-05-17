/*import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
//import 'zone.js/dist/zone'; 
//import { Haptic } from 'ionic-native';
//import { Vibration } from 'ionic-native';
import { GestureController }  from 'ionic-angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform } from 'ionic-angular';
import { ConfigMock, PlatformMock } from '../../mocks';
import { AboutPage } from './about';

import {Http} from '@angular/http';
import {TranslateModule,TranslateLoader} from 'ng2-translate/ng2-translate';
import {TranslateLoaderFactory} from '../../app/TranslateLoaderFactory';
import {SharedModule} from  '../../shared/shared.module';
//import { TranslateService } from 'ng2-translate';
//import {CacheService} from '../../shared/service/storage/CacheService';


let fixture: ComponentFixture<AboutPage> = null;
let instance: any = null;

describe('About: About', () => {
  // demonstration on how to manually compile the test bed (as opposed to calling TestUtils)
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPage],
      providers: [
        App, DomController, Form, Keyboard, MenuController, NavController,GestureController,//Vibration,Haptic,
        {provide: Config, useClass: ConfigMock},
        {provide: Platform, useClass: PlatformMock},
      ],
      imports: [
        FormsModule,
        IonicModule,
        SharedModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
            deps: [Http] 
        }),
        ReactiveFormsModule,
      ],
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AboutPage);
      instance = fixture;
      fixture.detectChanges();
    });
  }));

/*  afterEach(() => {
    fixture.destroy();
  });
*/
/*  it('should create About', () => {
   // expect(fixture).toBeTruthy();
   // expect(instance).toBeTruthy();
  });
});*/
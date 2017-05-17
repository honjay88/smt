import { NgModule, ErrorHandler,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MlotDataPage } from '../pages/home/MlotDetail';
//import { AppRequestOptions } from './app.request';
import { HttpModule } from '@angular/http';
import {TranslateModule,TranslateLoader} from 'ng2-translate/ng2-translate';
//import { TranslateService } from 'ng2-translate';
import { SharedModule } from '../shared/shared.module';
//import { Auth } from '../pages/login/Auth.service';
import {UserService} from '../pages/login/user.service'; 
import { LoginPage } from '../pages/login/login';  
import {Http} from '@angular/http';
import { PushInfoPage } from '../pages/pushInfo/pushInfo';  
//import {ProviderService} from '../shared/service/apiService/providerService';
import {TranslateLoaderFactory} from './TranslateLoaderFactory';
//import {HttpfactoryService} from '../shared/service/apiService/httpfactoryService';
import { HttpService } from '../shared/service/apiService/httpService';
import { SingnalRPage } from '../pages/singnalR/singnalR';  
//import { UtilConnService } from '../shared/commonTool/utilConnService';

export function HttpService2(http: Http) {
   return   new HttpService("http://192.168.99.1:39876", http);
}
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MlotDataPage,
    LoginPage,
    PushInfoPage,
    SingnalRPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SharedModule,
    HttpModule,
    TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: TranslateLoaderFactory,
            deps: [Http] 
        })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MlotDataPage,
    LoginPage,
    PushInfoPage,
    SingnalRPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UserService//,TranslateService//,{provide: RequestOptions, useClass: AppRequestOptions }
  ,{provide: ErrorHandler, useClass: IonicErrorHandler},
   {provide: HttpService, useFactory: HttpService2, deps: [Http]}]//,
  //HttpfactoryService
  // {provide: ProviderService, deps: [Http], useFactory: ProviderService("")}]
 //,ProviderService("http://services.odata.org/V3/(S(pq1lpmgz0kuok05ubqtx1c2g))/OData/OData.svc/")]
 //,ProviderService("http://192.168.99.1:39876")]
})
export class AppModule {}

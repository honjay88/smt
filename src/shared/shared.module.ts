import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {LongPressDirective} from './directives/long-press.directive';
import { HiddenDirective } from './directives/hidden.directive';
import {AuthService} from './service/Auth/Auth.service';
//import {CacheService} from './service/storage/CacheService';
import {NotificationService} from  './service/localNotification/notificationService';
//import {TagService} from './service/Common/switch';
import { PingService } from '../shared/service/apiService/PingService';
import { UtilService } from './commonTool/utilService';
//import { UtilConnService } from './commonTool/utilConnService';
//import {ConfigService} from './service/Common/config';
import {ChannelService,ChannelConfig,SignalrWindow} from './service/singnal/channel.service';
import {Ng2Webstorage} from 'ng2-webstorage';
//import {CategoryService} from './service/storage/CategoryService';
//import { Http } from '@angular/http';
//import {ProviderService} from '../shared/service/apiService/providerService';
 
import { TaskComponent }  from '../pages/singnalR/TaskComponent';

export function _channelConfig() {
    let config = new ChannelConfig();   
    config.url = "http://192.168.99.1:39876/signalr";  
    config.hubName = "EventHub";
    return  config;
}

 
@NgModule({
    declarations: [
        LongPressDirective,
        HiddenDirective,
        TaskComponent,
    ],
    imports: [Ng2Webstorage],
    exports: [
        LongPressDirective,
        HiddenDirective,
        TaskComponent 
    ], 
    entryComponents: [],
    providers:[
        UtilService,
     //   UtilConnService,
       // CacheService,
        NotificationService,
        AuthService,
       // TagService,
        PingService,
        ChannelService, 
        { provide: SignalrWindow, useValue: window },
        { provide: 'channel.config', useValue: _channelConfig }//,
      //  ConfigService////,
       // CategoryService   
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
}) 
export class SharedModule{}
import {Component,OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {ChannelService,ConnectionState} from '../../shared/service/singnal/channel.service'; 
import {Observable} from 'rxjs/Observable';
//import * as $ from 'signalr';

@Component({
  selector: 'page-singnalR', 
  templateUrl: 'singnalR.html'
  
})

export class SingnalRPage implements OnInit {
  pushMessage: string = "push message will be displayed here";
  connectionState$: Observable<string>;
  constructor(public params: NavParams,private channelService:ChannelService) {
    if (params.data.message) {
      this.pushMessage = params.data.message;
    }

     this.connectionState$ = this.channelService.connectionState$
            .map((state: ConnectionState) => { return ConnectionState[state]; });

        this.channelService.error$.subscribe(
            (error: any) => { console.warn(error); },
            (error: any) => { console.error("errors$ error", error); }
        );

        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        //
        this.channelService.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.warn("signalr service failed to start!"); }
        );
  }

   ngOnInit() {
        // Start the connection up!
        //
        console.log("Starting the channel service"); 
        this.channelService.start();
    }
}
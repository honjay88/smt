import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { SingnalRPage } from '../singnalR/singnalR';
import { TranslateService } from 'ng2-translate';
 
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = SingnalRPage;
 message:any;
  constructor(private translate: TranslateService) {
    console.log(6);
 this.message='Login';
  this.translate.get(this.message).subscribe(res => {this.message = res});
    console.log(this.message);
  }
}

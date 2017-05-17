import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'page-MlotDetail',
  templateUrl: 'MlotDetail.html'
 // styleUrls: ['/pages/home/MlotDetail.scss']
})

export class MlotDataPage {
  public firstParam: any;
  private message:any;

  constructor(private vc: ViewController, private _navParams: NavParams, private translate: TranslateService) {
    this.firstParam = _navParams.data;
    console.log(this.firstParam);
    this.message = 'MaterialNo';
    this.translate.get(this.message).subscribe(res => { this.message = res });
    console.log(this.message);
  }


  dismiss() {
    this.vc.dismiss();
  }

}
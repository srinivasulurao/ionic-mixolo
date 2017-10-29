import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PreviewThanksPage } from '../preview-thanks/preview-thanks';
/**
 * Generated class for the AdditionalEventInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-additional-event-info',
  templateUrl: 'additional-event-info.html',
})
export class AdditionalEventInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goNext(){
    //No validation required.
    localStorage.setItem("event_additional_notes",this['event_additional_notes']); //it could be empty.
    this.navCtrl.push(PreviewThanksPage);
      
  }

}

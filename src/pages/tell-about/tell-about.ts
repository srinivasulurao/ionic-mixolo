import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventTitlePage } from "../event-title/event-title";
/**
 * Generated class for the TellAboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tell-about',
  templateUrl: 'tell-about.html',
})
export class TellUsAboutEventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goNext(){
    this.navCtrl.push(EventTitlePage);
  }
  
}

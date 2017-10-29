import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetEventAddressPage } from '../set-event-address/set-event-address';
import {AlertController } from 'ionic-angular';

/**
 * Generated class for the SetDescriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-set-description',
  templateUrl: 'set-description.html',
})
export class SetDescriptionPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
  }

  
   goNext(){
     var event_description=this['event_description'];
     if(event_description=="" || event_description == undefined){
          let alert = this.alertCtrl.create({
            title: 'Operation Failed',
            subTitle: 'Event Description is required !',
            buttons: ['Dismiss']
          });
        alert.present();
     }
     else{
       localStorage.setItem('event_description',event_description);
       this.navCtrl.push(SetEventAddressPage);
     }

   }
}

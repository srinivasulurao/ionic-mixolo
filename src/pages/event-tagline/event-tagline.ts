import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular'; 
import { ScheduleTimePage } from '../schedule-time/schedule-time';

/**
 * Generated class for the EventTitlePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-event-tagline',
  templateUrl: 'event-tagline.html',
})
export class EventTaglinePage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  goNext(){
    var event_tagline=this['event_tagline'];
     
    if(event_tagline=="" || event_tagline==null){
      let alert = this.alertCtrl.create({
        title: 'Operation Failed',
        subTitle: 'Please enter a event tagline !',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else{
      localStorage.setItem('admin_event_tagline',event_tagline); 
      this.navCtrl.push(ScheduleTimePage);
    }
  }

}//Class ends here.

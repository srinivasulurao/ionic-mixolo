import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EventTaglinePage } from '../event-tagline/event-tagline'; 

/**
 * Generated class for the EventTitlePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-event-title',
  templateUrl: 'event-title.html',
})
export class EventTitlePage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  goNext(){
    var event_title=this['event_title'];
     
    if(event_title=="" || event_title==null){
      let alert = this.alertCtrl.create({
        title: 'Operation Failed',
        subTitle: 'Please enter a event title !',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else{
      localStorage.setItem('admin_event_title',event_title); 
      this.navCtrl.push(EventTaglinePage);
    }
  }

}//Class ends here.

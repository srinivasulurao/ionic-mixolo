import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController} from "ionic-angular";
import { MixoloEventService} from '../../app/services/mixolo.events.service';
/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
 
  public loaderCtrl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mixoloWebService: MixoloEventService, public loader:LoadingController) {
    this.mixoloWebService.getProfileData().subscribe(response=>{
      this['push_notification']=(parseInt(response['user_data'].push_notification))?true:false;
      this['app_sounds_vibrations']=(parseInt(response['user_data'].app_sounds_vibrations))?true:false;
    });
  }

  saveNotification(){
    this.loaderCtrl=this.loader.create({
      content: 'Saving ...'
    });

    this.loaderCtrl.present();

    var push_notification=this['push_notification'];
    var app_sound_vibrations=this['app_sounds_vibrations'];

    this.mixoloWebService.updateNotification(push_notification,app_sound_vibrations).subscribe(response=>{
      //console.log(response); 
      this.loaderCtrl.dismiss();
    });

  }

}

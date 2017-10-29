import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ThanksAdminPage } from '../thanks-admin/thanks-admin';

/**
 * Generated class for the DigitalFootprintPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-digital-footprint',
  templateUrl: 'digital-footprint.html',
})
export class DigitalFootprintPage {
    public loaderCtrl:any; 
    constructor(public navCtrl: NavController,private mixoloEvents:MixoloEventService,public alertCtrl: AlertController,public loader: LoadingController) {
    
    }


    goNext(){
      if(this['digital_footprint']=="" || this['digital_footprint']==undefined){
          let alert = this.alertCtrl.create({
            title: 'Operation Failed !',
            subTitle: "Please add a comment!",
            buttons: ['Dismiss']
          });
    
          alert.present();
      }
      else{
          this.loaderCtrl=this.loader.create({
            content: 'Saving...'
          });

          this.loaderCtrl.present();
          var organizer_id=localStorage.getItem('admin_user_id');
          this.mixoloEvents.sendOrganizerFeedback(this['digital_footprint'],organizer_id).subscribe(response=>{
            console.log(response);
            this.loaderCtrl.dismiss();

            let alert = this.alertCtrl.create({
              title: 'Event Details!',
              subTitle: "Feedback Submitted !",
              buttons: [{text:"OK",handler:()=>{
                this.navCtrl.setRoot(ThanksAdminPage);
              }}]
            });
      
            alert.present();

          });
          

      }


    } // Function ends here.


  
}

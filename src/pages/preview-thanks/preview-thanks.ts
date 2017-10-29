import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DigitalFootprintPage } from '../digital-footprint/digital-footprint';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ThanksAdminPage } from  '../thanks-admin/thanks-admin';

/**
 * Generated class for the PreviewThanksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-preview-thanks',
  templateUrl: 'preview-thanks.html',
})
export class PreviewThanksPage {
  public loaderCtrl:any;
    constructor(public navCtrl: NavController,private mixoloEvents:MixoloEventService,public alertCtrl: AlertController,public loader: LoadingController) {
    
    }


  goNext(){

    this.loaderCtrl=this.loader.create({
      content: 'Registering Account ...'
    });
    this.loaderCtrl.present();
    this.mixoloEvents.createEvent().subscribe(response=>{
          console.log(response);
          this.loaderCtrl.dismiss();
          this.navCtrl.push(DigitalFootprintPage);
    });

  }

  
} //Class Ends here.

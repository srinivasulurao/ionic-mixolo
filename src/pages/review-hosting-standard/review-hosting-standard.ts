import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { TellUsAboutEventPage } from '../tell-about/tell-about';
/**
 * Generated class for the ReviewHostingStandardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-review-hosting-standard',
  templateUrl: 'review-hosting-standard.html',
})
export class ReviewHostingStandardPage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  goNext(){
    var hsc=this['hosting_standard_checked'];
        if(hsc!=true){
          let alert = this.alertCtrl.create({
              title: 'Operation Failed',
              subTitle: 'Please select hosting standard terms !',
              buttons: ['Dismiss']
          });
          alert.present();
          
        }
        else{
           this.navCtrl.push(TellUsAboutEventPage); //All seems to be good.
        }
  } 
  

}//Class Ends here.

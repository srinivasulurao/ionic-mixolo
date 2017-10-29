import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';

/**
 * Generated class for the TermsConditionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-terms-conditions',
  templateUrl: 'terms-conditions.html',
})
export class TermsConditionsPage {
  public mixoloData:any;
  public Image:any;
  public Text:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mixoloWS:MixoloEventService) {
    this.getMixoloTextData();
  }

  getMixoloTextData(){
    
    this.mixoloWS.getMixoloData().subscribe(response=>{    
     this.mixoloData=response.mixolo;
    //console.log(this.mixoloData);
     this.Image=this.mixoloData.Terms_Image;
     this.Text=this.mixoloData.Terms_Service;
    });
   }

}

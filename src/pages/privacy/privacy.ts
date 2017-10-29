import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
/**
 * Generated class for the PrivacyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {
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
     this.Image=this.mixoloData.Privacy_Image;
     this.Text=this.mixoloData.Privacy_policy;
    });
   }

}

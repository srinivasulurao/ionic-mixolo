import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the PoliciesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-policies',
  templateUrl: 'policies.html',
})
export class PoliciesPage {

  public mixoloData:any;
  public policiesImage:any;
  public policies:any;
  constructor(public navCtrl: NavController, private navParams:NavParams, public mixoloWS:MixoloEventService,private _sanitizer: DomSanitizer) {
    this.getMixoloTextData();
    
  }

  getBackgroundImage(image){
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.5), rgba(16, 16, 23, 0.5)), url(${image})`);
  }

   getMixoloTextData(){
    
    this.mixoloWS.getMixoloData().subscribe(response=>{    
     this.mixoloData=response.mixolo;
    //console.log(this.mixoloData);
     this.policiesImage=this.mixoloData.Policies_Image;
     this.policies=this.mixoloData.Policies;
    });
   }
}

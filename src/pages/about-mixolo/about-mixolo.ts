import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
/**
 * Generated class for the AboutMixoloPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-about-mixolo',
  templateUrl: 'about-mixolo.html',
})
export class AboutMixoloPage {
  public mixoloData:any;
  public aboutImage:any;
  public About:any;
  constructor(public navCtrl: NavController, private navParams:NavParams, public mixoloWS:MixoloEventService) {

    
  }

  ngOnInit(){

    this.getMixoloTextData();
  }

   getMixoloTextData(){
    
    this.mixoloWS.getMixoloData().subscribe(response=>{    
     this.mixoloData=response.mixolo;
    //console.log(this.mixoloData);
     this.aboutImage=this.mixoloData.About_Image;
     this.About=this.mixoloData.About;
    });
   }
}

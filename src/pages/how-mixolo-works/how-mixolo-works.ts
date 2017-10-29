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
  selector: 'page-how-mixolo-works',
  templateUrl: 'how-mixolo-works.html',
})
export class HowMixoloWorksPage {
  public mixoloData:any;
  public how:any;
  public why:any;
  public what:any;
  public About:any;
  public video:any;

  constructor(public navCtrl: NavController, private navParams:NavParams, public mixoloWS:MixoloEventService) {

    
  }

  ngOnInit(){

    this.getMixoloTextData();
  }

   getMixoloTextData(){
    
    this.mixoloWS.getMixoloData().subscribe(response=>{    
     this.mixoloData=response.mixolo;
    //console.log(this.mixoloData);
     //this.video=this.mixoloData.Video;
     this.video='<video controls="controls" preload="metadata" autoplay="autoplay" webkit-playsinline="webkit-playsinline" class="videoPlayer">';
     this.video+='<source src="'+this.mixoloData.Video+'" type="video/mp4"/>';
     this.video+='</video>';
     this.how=this.mixoloData.How;
     this.why=this.mixoloData.Why;
     this.what=this.mixoloData.What; 

    });
   }
}

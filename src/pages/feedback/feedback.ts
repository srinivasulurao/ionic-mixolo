import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController} from "ionic-angular";
import { MixoloEventService} from '../../app/services/mixolo.events.service';

/**
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  public loaderCtrl:any;
  public showFeedback:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mixoloWebService: MixoloEventService, public loader:LoadingController) {
  }

  showHideFeedback(){
    if(this.showFeedback==true)
       this.showFeedback=false;
    else
       this.showFeedback=true;
  }

  submitFeedback() {
    this.loaderCtrl=this.loader.create({
      content: 'Thank you for your valuable feedback!'
    });

    this.loaderCtrl.present();

    var feedback_message=this['feedback_message'];
    var instance=this;
    this.mixoloWebService.sendFeedbackMessage(feedback_message).subscribe(response=>{
      if(response.status=="success"){
        this['feedback_message']="";
        this.showFeedback=false;
      }
      this.loaderCtrl.dismiss();
    });

  }

}

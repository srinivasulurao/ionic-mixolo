import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { MixoloEventService } from '../../app/services/mixolo.events.service';
import { DomSanitizer } from '@angular/platform-browser'
import { EventsPage } from '../events/events';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the LikePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-like',
  templateUrl: 'like.html',
})
export class LikePage {
  public eventDetails:any; // Very Important, always assign a access specifier.
  public likelyStatus:any;
  public loaderCtrl:any;

    constructor(
      public navCtrl: NavController, 
      private navParams:NavParams,
      public mixoloWS:MixoloEventService,
      private _sanitizer: DomSanitizer,
      public loader:LoadingController,
      private alertCtrl:AlertController) {

      this.eventDetails=navParams.get("event_details"); 
      this.likelyStatus=""; 
      this['how_friendly']="";    
      this['rate']=""; 

    }

    getBackgroundImage(image){
      return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.5), rgba(16, 16, 23, 0.5)), url(${image})`);
    }

    rangeSliderChange(){

      if(this['likely_recommend']==1)
         this.likelyStatus="Not a chance";
      else if(this['likely_recommend']==2)
         this.likelyStatus="Not Likely";
      else if(this['likely_recommend']==3)
         this.likelyStatus="Somewhat Likely";
      else if(this['likely_recommend']==4)
         this.likelyStatus="Very Likely";
      else if(this['likely_recommend']==5)
         this.likelyStatus="Extremely Likely";
      else
         this.likelyStatus="";
    }

    submitRating(){
      var instance=this;
      if(this.validationOK()){

        this.loaderCtrl=this.loader.create({
          content: 'Authenticating ...'
        });
        
        this.loaderCtrl.present();

        this.mixoloWS.submitEventRating(instance.eventDetails.Event_ID,this.likelyStatus,this['how_friendly'],this['attend_another'],this['rate'],this['comments']).subscribe(response=>{
         if(response.status=="success"){
         this.loaderCtrl.dismiss();  
         instance.navCtrl.push(EventsPage);
         }
        });

    
      }
    }

    validationOK(){
      var error_message="";
    
      if(this['likely_recommend']=="" || this['likely_recommend']==null)
        error_message+="<li>Please suggest likely recommendation !</li>";
      if(this['how_friendly']=="" || this['how_friendly']==null)
        error_message+="<li>Please suggest friendly recommendation !</li>";
      if(this['attend_another']=="" || this['attend_another']==null)
        error_message+="<li>Please suggest another attendance !</li>";
      if(this['rate']=="" || this['rate']==null)
        error_message+="<li>Please rate the event !</li>";
      if(this['comments']=="" || this['comments']==null)
        error_message+="<li>Please fill the comments !</li>";
     
      if(error_message!=""){  
        //console.log(error_message);
         let alert = this.alertCtrl.create({
          title: 'Operation Failed !',
          subTitle: "<ul class='rating_validation_message'>"+error_message+"</ul>",
          buttons: ['Dismiss']
        });

        alert.present();
        return false;
      }
      if(error_message==""){
       return true;
      }
    }
  
    ngOnInit(){
      
    }
    
      
  
  
  }  // Class Ends here.

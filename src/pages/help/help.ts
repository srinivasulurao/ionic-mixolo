import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';

/**
 * Generated class for the HelpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  
  public faqs:boolean=false;
  public your_account:boolean=false;
  public communications:boolean=false;
  public community_engagement:boolean=false;
  public trust_safety:boolean=false;
  public fees_and_payments:boolean=false;
  public cancellations_refunds:boolean=false;
  public legal:boolean=false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public mixoloWS:MixoloEventService) {
    
    this.getMixoloTextData();
  }

  getMixoloTextData(){
    
    this.mixoloWS.getMixoloFaq().subscribe(response=>{    
     this.faqs=response;
    });
   }

   hideCorresponding(collapsible_div){
    
    if(collapsible_div=="faqs"){
      this.faqs=!this.faqs;
    }
    if(collapsible_div=="your_account"){
      this.your_account=!this.your_account;      
    }
    if(collapsible_div=="communications"){
      if(this.communications==true){
        this.communications=false;
      }
      else{
        this.communications=true;
      }
    }
    if(collapsible_div=="community_engagement"){
      if(this.community_engagement==true){
        this.community_engagement=false;
      }
      else{
        this.community_engagement=true;
      }
    }
    if(collapsible_div=="trust_safety"){
      if(this.trust_safety==true){
        this.trust_safety=false;
      }
      else{
        this.trust_safety=true;
      }
    }
    if(collapsible_div=="fees_and_payments"){
      if(this.fees_and_payments==true){
        this.fees_and_payments=false;
      }
      else{
        this.fees_and_payments=true;
      }
    }
    if(collapsible_div=="cancellations_refunds"){
      if(this.cancellations_refunds==true){
        this.cancellations_refunds=false;
      }
      else{
        this.cancellations_refunds=true;
      }
    }
    if(collapsible_div=="legal"){
      if(this.legal==true){
        this.legal=false;
      }
      else{
        this.legal=true;
      }
    }


}


} // Class Ends here.

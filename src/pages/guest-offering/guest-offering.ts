import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from  'ionic-angular';
import { AdditionalEventInfoPage } from '../additional-event-info/additional-event-info';
/**
 * Generated class for the GuestOfferingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-guest-offering',
  templateUrl: 'guest-offering.html',
})
export class GuestOfferingPage {

public foodList:any;
public beverageList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
     this.foodList=['Additional Cost','Included in Ticket price','No food'];
     this.beverageList=['Additional Cost','Included in Ticket price','No Beverages'];
  }

  goNext(){
    if(this.validationOK()){

            localStorage.setItem('event_food',this['event_food']);
            localStorage.setItem('event_beverages',this['event_beverages']);
            localStorage.setItem('event_fd_1',this['event_fd_1']);
            localStorage.setItem('event_fd_2',this['event_fd_2']);
            localStorage.setItem('event_fd_3',this['event_fd_3']);
            localStorage.setItem('event_fd_4',this['event_fd_4']);
            localStorage.setItem('event_fd_5',this['event_fd_5']);
            localStorage.setItem('event_other_offers',this['event_other_offers']);

        this.navCtrl.push(AdditionalEventInfoPage); 
    }
  }

  validationOK(){
    
    var event_food=this['event_food'];
    var event_beverages=this['event_beverages'];
    var event_fd_1=this['event_fd_1'];
    var event_fd_2=this['event_fd_2'];
    var event_fd_3=this['event_fd_3'];
    var event_fd_4=this['event_fd_4'];
    var event_fd_5=this['event_fd_5'];
    var event_other_offers=this['event_other_offers'];

    var error="";
    if(event_food=="" || event_food==undefined){
        error+="<li>Event food details are required !</li>"; 
    }
    if(event_beverages=="" || event_beverages==undefined){
        error+="<li>Event beverage is required !</li>"; 
    }

    if(error){
         let alert = this.alertCtrl.create({
             title: 'Operation Failed',
             subTitle: "<ul class='rating_validation_message'>"+error+"</ul>",
             buttons: ['Dismiss']
         });
         alert.present();
         return false;
    }
    else{
        return true; //All seems to be good.
    }
  }
  

}

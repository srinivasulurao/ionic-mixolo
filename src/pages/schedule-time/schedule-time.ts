import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular'; 
import { SetPricePage } from '../set-price/set-price';

/**
 * Generated class for the EventTitlePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({ 
  selector: 'page-schedule-time',
  templateUrl: 'schedule-time.html',
})
export class ScheduleTimePage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  goNext(){
   var event_start_date=this['event_start_date'];
   var event_end_date=this['event_end_date'];

   if(this.validationOk()){
    localStorage.setItem('event_start_date',event_start_date);
    localStorage.setItem('event_end_date',event_end_date);  

    this.navCtrl.push(SetPricePage);       
  }


  }

  validationOk(){
    var event_start_date=this['event_start_date'];
    var event_end_date=this['event_end_date'];

    var error="";
    if(event_start_date=="" || event_start_date==undefined){
        error+="<li>Select event's start time !</li>"; 
    }
    if(event_end_date=="" || event_end_date==undefined){
        error+="<li>Select event's end time !</li>"; 
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

}//Class ends here.

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { SetDescriptionPage } from '../set-description/set-description';
/**
 * Generated class for the SetPricePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-set-price',
  templateUrl: 'set-price.html',
})
export class SetPricePage {

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams) {
  }

   goNext(){
     var event_ticket_title=this['event_ticket_title'];
     var event_ticket_price=this['event_ticket_price'];
     var event_ticket_quantity=this['event_ticket_quantity'];

     if(this.validationOK()){
      localStorage.setItem('event_ticket_title',event_ticket_title);
      localStorage.setItem('event_ticket_price',event_ticket_price);
      localStorage.setItem('event_ticket_quantity',event_ticket_quantity);
      this.navCtrl.push(SetDescriptionPage);
     }
   }

   validationOK(){
    var event_ticket_title=this['event_ticket_title'];
    var event_ticket_price=this['event_ticket_price'];
    var event_ticket_quantity=this['event_ticket_quantity'];

    var error="";
    if(event_ticket_title=="" || event_ticket_title==undefined){
        error+="<li>Ticket title is required !</li>";
    }
    if(event_ticket_price=="" || event_ticket_price==undefined){
        error+="<li>Ticket price is required !</li>";
    }
    if(event_ticket_quantity=="" || event_ticket_quantity==undefined){
      error+="<li>Ticket quantity is required !</li>";
    }

    if(error){
         let alert = this.alertCtrl.create({
             title: 'Operation Failed',
             subTitle: '<ul>'+error+"</ul>",
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

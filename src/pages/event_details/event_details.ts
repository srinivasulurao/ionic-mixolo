import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { AlertController} from 'ionic-angular';
import { PaypalPage } from '../paypal/paypal';

@Component({
  selector: 'event-details',
  templateUrl: 'event_details.html'
})

export class EventDetailsPage {
  public eventDetails:any; // Very Important, always assign a access specifier.
  public paypalPrice:any;

  constructor(public navCtrl: NavController, private navParams:NavParams, public mixoloEvent:MixoloEventService, public alertCtrl: AlertController) {
    this.eventDetails=navParams.get("event_details"); 
    this.eventDetails.Food_Beverage=this.eventDetails.Food_Beverage.toString().split(",");
    this.eventDetails.distance=(this.eventDetails.distance)?this.eventDetails.distance:0;
    console.log(this.eventDetails); 
  }

  ngOnInit(){
    
  }


  buyTickets(){
    //Show a alert with select box
    let alert = this.alertCtrl.create({
      title: 'Select Ticket & Price'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Ticket General $'+this.eventDetails.Ticket_price,
      name: 'ticket_price',
      id: this.eventDetails.Event_ID,
      value: this.eventDetails.Ticket_price,
      checked: true
    });

    alert.addButton('Cancel');

    alert.addButton({
      text: 'Okay',
      handler: data => {
        this.paypalPrice=data;
        this.takePaypalMessage();
      }
    });
  
    alert.present();
  }

  takePaypalMessage(){

    let alert = this.alertCtrl.create({
      message:"Please state any disabilities or health concerns that might make your experience safer or more enjoyable below."
    });

    alert.addInput({
      type: 'textarea',
      name: 'paypal_text',
      placeholder:"Enter here !"
    });

    alert.addInput({
      type: 'number',
      name: 'quantity',
      value: '1',
      min:'1',
      placeholder:"Enter Quantity !"
    });

    alert.addButton('CLOSE');

    alert.addButton({
      text: 'SEND',
      handler: data => {
        console.log(data);
        this.navCtrl.push(PaypalPage,{event_details:this.eventDetails,paypal_text:data.paypal_text,quantity:data.quantity});
      }
    });
  
    alert.present();

    
  }
  
    


}  // Class Ends here.

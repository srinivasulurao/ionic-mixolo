import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { EventDetailsPage} from '../event_details/event_details';

/**
 * Generated class for the PaypalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {
  public eventDetails:any;
  public paypalText:any;
  public paypalStatusText:any;
  public payment_complete:any;

  payment: PayPalPayment = new PayPalPayment('10.10', 'USD', 'TV', 'sale');
  currencies = ['EUR', 'USD'];
  payPalEnvironment: string = 'payPalEnvironmentSandbox';

  constructor(public navCtrl: NavController, public navParams: NavParams, private payPal: PayPal, public mixoloEvents:MixoloEventService) {
    this.eventDetails=navParams.get("event_details"); 
    this.paypalText=navParams.get('paypal_text');
    this.payment_complete=0;

  

  this.payPal.init({
    
    PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
    PayPalEnvironmentSandbox: 'AdjdMPGmKe-IkCWuWWcCwHG22z35Iry5l6rI1fqci4WObEec1Y0RL-mxoBV3Xt-2Jevl9PCu4zu_iRzN'
  }).then(() => {
    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      // Only needed if you get an "Internal Service Error" after PayPal login!
      //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    })).then(() => {
      let payment = new PayPalPayment(this.eventDetails.Ticket_price, 'USD',this.eventDetails.title, 'sale');
      this.payPal.renderSinglePaymentUI(payment).then((response) => {

          console.log(response);
          

        // Successfully paid
  
        // Example sandbox response
        //
        // {
        //   "client": {
        //     "environment": "sandbox",
        //     "product_name": "PayPal iOS SDK",
        //     "paypal_sdk_version": "2.16.0",
        //     "platform": "iOS"
        //   },
        //   "response_type": "payment",
        //   "response": {
        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
        //     "state": "approved",
        //     "create_time": "2016-10-03T13:33:33Z",
        //     "intent": "sale"
        //   }
        // }

        this.paymentSuccess(response);
        this.paypalStatusText="Payment paid successfully !";
        this.payment_complete=1;
        
      }, () => {
        // Error or render dialog closed without being successful
      });
    }, () => {
      // Error in configuration
    });
  }, () => {
    // Error in initialization, maybe PayPal isn't supported or something else
  });

}

paymentSuccess(payment_details){
  var event_id=this.eventDetails.Event_ID;
  var app_user_id=localStorage.getItem('user_id');
  var ticket_id=this.eventDetails.Tax_ID;
  var transaction_id=payment_details.response.id;
  var success_payment=(payment_details.response.state=="approved")?1:0;
  var order_total_amount=this.eventDetails.Ticket_price;
  var message=this.paypalText.paypal_text;
  var total_ticket_quantity=1;
  var booking_fee=0;
  var organiser_booking_fee=0;

  this.mixoloEvents.appCheckoutSuccess(event_id,app_user_id,ticket_id,transaction_id,success_payment,order_total_amount,total_ticket_quantity,booking_fee,organiser_booking_fee,message).subscribe(response=>{
   
   console.log(response);
});

}

redirect(){
  this.navCtrl.push(EventDetailsPage,{event_details:this.eventDetails});
}

} //class Ends here.

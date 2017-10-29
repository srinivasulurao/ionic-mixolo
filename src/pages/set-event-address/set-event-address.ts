import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { EventPhotoUploadPage } from '../event-photo-upload/event-photo-upload';

/**
 * Generated class for the SetEventAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-set-event-address',
  templateUrl: 'set-event-address.html',
})
export class SetEventAddressPage {

  public cityList:any;
  public stateList:any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private mixoloWebService:MixoloEventService) {
    this.loadCities();
    this.loadStates();
  }

  loadCities(){
    this.mixoloWebService.getCityList().subscribe(response=>{
        this.cityList=response; 
        //console.log(this.cityList);  
      });
   }

   loadStates(){
    this.mixoloWebService.getStateList().subscribe(response=>{
      this.stateList=response; 
      //console.log(this.stateList);  
    });
   }
   

  goNext(){
    var event_venue_address=this['event_venue_address'];
    var event_state=this['event_state'];
    var event_city=this['event_city'];
    var event_zipcode=this['event_zipcode'];
    var event_venue_description=this['event_venue_description'];

 
    if(this.validationOk()){
     localStorage.setItem('event_venue_address',event_venue_address);
     localStorage.setItem('event_state',event_state);  
     localStorage.setItem('event_city',event_city);  
     localStorage.setItem('event_zipcode',event_zipcode);
     localStorage.setItem('event_venue_description',event_venue_description);  
 
     this.navCtrl.push(EventPhotoUploadPage);        
     }
 
 
   }
 
   validationOk(){
    var event_venue_address=this['event_venue_address'];
    var event_state=this['event_state'];
    var event_city=this['event_city'];
    var event_venue_description=this['event_venue_description'];
    var event_zipcode=this['event_zipcode'];
 
     var error="";
     if(event_venue_address=="" || event_venue_address==undefined){
         error+="<li>Venue Address is required !</li>"; 
     }
     if(event_city=="" || event_city==undefined){
         error+="<li>City is required !</li>"; 
     }
     if(event_state=="" || event_state==undefined){
      error+="<li>State is required !</li>"; 
     }
     if(event_zipcode=="" || event_zipcode==undefined){
      error+="<li>Zip code is required !</li>"; 
     }
    if(event_venue_description=="" || event_venue_description==undefined){
        error+="<li>Venue Description is required !</li>"; 
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

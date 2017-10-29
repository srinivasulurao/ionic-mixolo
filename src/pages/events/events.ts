import { Component } from '@angular/core';
import {EventDetailsPage} from '../event_details/event_details';
import { NavController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import {LoadingController} from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { LikePage }  from '../like/like'
@Component({
  selector: 'events-list',
  templateUrl: 'events.html'
})
export class EventsPage {
  public event;
  public upcoming_events:any;
  public past_events:any;
  public loaderCtrl:any;
  public latitude:any;
  public longitude:any;

  constructor(public navCtrl: NavController,
    private mixoloEvents:MixoloEventService,
    public alertCtrl: AlertController,
    public loader: LoadingController,
    private _sanitizer: DomSanitizer,
    private geolocation: Geolocation) {
    this.event="upcoming";
  }

  //By Default Lifecycle Event.
  ngOnInit(){
    this.event="upcoming";
    var instance=this;
    this.loaderCtrl=this.loader.create({
      content: 'Loading...'
    });
    
    this.loaderCtrl.present();

    this.geolocation.getCurrentPosition().then((response) => {

      this.latitude=response.coords.latitude;
      this.longitude=response.coords.longitude;
      
      instance.getUpcomingEvents(this.latitude,this.longitude);
      instance.getPastEvents(this.latitude,this.longitude);

      
    
      }).catch((error) => {
        alert('Error getting location'+JSON.stringify(error));
      });

  
  }

  getBackgroundImage(image){
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.5), rgba(16, 16, 23, 0.5)), url(${image})`);
  }
  
 navigate(event_id) {
    this.navCtrl.push(EventDetailsPage, {
      "event_id":event_id
    });
  }
  
  getUpcomingEvents(latitude,longitude){
    
    
    this.upcoming_events=[];
        this.mixoloEvents.getUpcomingEvents(latitude,longitude).subscribe(response=>{
         // console.log(response);  
          this.upcoming_events=response;
          
    });
  }

  navigateEventDetailsPage(event){
   this.navCtrl.push(EventDetailsPage,{event_details:event});
  }

  navigateLikePage(event){
    this.navCtrl.push(LikePage,{event_details:event});
  }

  getPastEvents(latitude,longitude){
    
    this.past_events=[];
        this.mixoloEvents.getPastEvents(latitude,longitude).subscribe(response=>{
          console.log(response); 
          this.past_events=response;
          this.loaderCtrl.dismiss();

          
          
    });
  }

  

}  // Class Ends here.

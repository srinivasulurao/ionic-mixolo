import { Component } from '@angular/core';
import { EventDetailsPage} from '../event_details/event_details';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import {LoadingController} from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { LikePage }  from '../like/like';
import { FilterPage } from '../filter/filter';

@Component({
  selector: 'finds-filter',
  templateUrl: 'finds.html'
})
export class FindsPage {
  public event;
  public events:any;
  public loaderCtrl:any;
  public latitude:any;
  public longitude:any;
  public filterData:any;
  public show_search_box:boolean=false;

  constructor(public navCtrl: NavController,
    private mixoloEvents:MixoloEventService,
    public alertCtrl: AlertController,
    public loader: LoadingController,
    private _sanitizer: DomSanitizer,
    private navParams: NavParams,
    private geolocation: Geolocation) {
    
      this.filterData=new Array();
      this.filterData=navParams.get("filter_data"); 

  }

  //By Default Lifecycle Event.
  ngOnInit(){
    
    var instance=this;
    this.loaderCtrl=this.loader.create({
      content: 'Loading...'
    });
    
    this.loaderCtrl.present();

    this.geolocation.getCurrentPosition().then((response) => {

      this.latitude=response.coords.latitude;
      this.longitude=response.coords.longitude;
      
      instance.getUserEvents(this.latitude,this.longitude);
    
      }).catch((error) => {
        alert('Error getting location'+JSON.stringify(error));
      });

  
  }

  getBackgroundImage(image){
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.5), rgba(16, 16, 23, 0.5)), url(${image})`);
  }
  
  navigateFilterPage() {
    //this.navCtrl.push(EventDetailsPage, {
    //  "event_id":event_id
   // });

   this.navCtrl.push(FilterPage);
  }

  searchEventsByKeywords(){
    var instance=this;
    this.loaderCtrl=this.loader.create({
      content: 'Loading...'
    });

    this.loaderCtrl.present();
    
    this.events=[];
    this.mixoloEvents.searchEventsByKeywords(this['search_keyword']).subscribe(response=>{
      //console.log(response); 
      //console.log(this.filterData);   
      //this.events=(this.filterData)?this.filterData:response;
      this.events=response;
      this.loaderCtrl.dismiss();
      });
  }

  showSearchBox(){
    if(this.show_search_box==false)
      this.show_search_box=true;
    else
      this.show_search_box=false;
  }
  

  navigateEventDetailsPage(event){
   this.navCtrl.push(EventDetailsPage,{event_details:event});
  }

  getUserEvents(latitude,longitude){
    
    this.events=[];
        //this.mixoloEvents.getAllEventsOfUser(latitude,longitude).subscribe(response=>{
          this.mixoloEvents.searchEventsByFilter("","","","","","","",1,"").subscribe(response=>{
          //console.log(response); 
          //console.log(this.filterData);   
          this.events=(this.filterData)?this.filterData:response; 
          this.loaderCtrl.dismiss();

        
    });
  }

  

}  // Class Ends here.

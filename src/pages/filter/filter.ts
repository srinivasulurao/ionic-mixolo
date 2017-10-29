import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController } from 'ionic-angular';
import { LoadingController} from "ionic-angular";
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { Geolocation } from '@ionic-native/geolocation';
import { FindsPage} from "../finds/finds";

/**
 * Generated class for the FilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  public interestList:any;
  public cities:any;
  public latitude:any;
  public longitude:any;
  public loaderCtrl:any;

  constructor(private geolocation: Geolocation,public navCtrl: NavController, public mixoloWebService: MixoloEventService, public loader:LoadingController, public alertCtrl: AlertController) {
    this.loadInterests();
    this.loadCities();
    this.resetFilter(); 
  
    var instance=this;
    this.geolocation.getCurrentPosition().then((response) => {
      
            this.latitude=response.coords.latitude;
            this.longitude=response.coords.longitude;

            }).catch((error) => {
              alert('Error getting location'+JSON.stringify(error));
            });

  
  }

  resetFilter(){
    this['location']="";
    this['date']=new Date().toISOString(); 
    this['interests']=[""];  
    this['price']=0;
    this['max_distance']=0;
  }


  loadInterests(){
    this.interestList=[];
    var user_id=localStorage.getItem('user_id');
    this.mixoloWebService.getAllInterests().subscribe(response=>{
        //console.log(response);
        this.interestList=response; 
    }); //WebService Call Ends here.
  }

  loadCities(){
    this.mixoloWebService.getCityList().subscribe(response=>{
      //console.log(response);
      this.cities=response; 
  }); //WebService Call Ends here.
  }

  searchFilterEvents(){ 

    this.loaderCtrl=this.loader.create({
      content: 'Searching...'
    });
    
    this.loaderCtrl.present();

    this.mixoloWebService.searchEventsByFilter(this['max_distance'],this['city'],this['price'],this['interests'],"",this.latitude,this.longitude,1,this['date']).subscribe(response=>{
      console.log(response);
      this.loaderCtrl.dismiss();
      if(response!=null){
        this.navCtrl.push(FindsPage,{filter_data:response});  
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Not Found',
          subTitle: 'Sorry, No events are found with your search criteria !',
          buttons: ['Close']
        });
        alert.present();
      }
  }); //WebService Call Ends here.
  }
}

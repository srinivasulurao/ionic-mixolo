import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../settings/settings';
import { HelpPage } from  '../help/help'; 

@Component({
  selector: 'profile',
  templateUrl: 'profiles.html'
})
export class ProfilesPage {
  public profileDetails:any;
  public email:any;
  public password:any;
  public profileInterests:any;
  public local:any;
  constructor(public navCtrl: NavController, public mixoloWebService: MixoloEventService, public storage: Storage) {
   ///this.local = new Storage(Storage);
  }

  //By Default initialization function.
  ngOnInit(){
  this.loadProfileData();
  }

  navigateHelp(){
    this.navCtrl.push(HelpPage);
  }
  
  navigateSettings(){
    this.navCtrl.push(SettingsPage);
  }
  loadProfileData(){
    
   var email=localStorage.getItem('username');
   var password=localStorage.getItem('password');
   var user_id=localStorage.getItem('user_id');

   this.profileDetails={};
   this.mixoloWebService.attemptLogin(email,password).subscribe(response=>{
        this.profileDetails=response['user_data'];
        this.profileDetails.Profile_Image=(this.profileDetails.Profile_Image)?atob("aHR0cDovL2FwcGRkaWN0aW9uc3R1ZGlvLmNvbS9taXhvbG8v")+"profile_photos/"+this.profileDetails.Profile_Image+"?"+Math.random():localStorage.getItem('social_profile_image');
        console.log(this.profileDetails);
    }); //WebService Call Ends here.
    
    this.profileInterests=[];
    this.mixoloWebService.getProfileInterests(user_id).subscribe(response=>{
        if(response==null){
          response=new Array();
          response[0]=new Array(); 
          response[0]['Interest_ID']=21321323213;
          response[0]['Interest']="None";
        }
        this.profileInterests=response; 
        localStorage.setItem('user_interests',JSON.stringify(response));
        console.log(response);
    }); //WebService Call Ends here.

  }



}  // Class Ends here.

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { Storage } from '@ionic/storage';
import { LoadingController} from "ionic-angular";
import { HomePage} from "../home/home";
import { ChangeProfilePasswordPage} from '../change_profile_password/change_profile_password'
import { AccountPage} from  "../account/account";
import { ProfilesPage} from  "../profiles/profiles";
import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';  
import { ImagePicker } from '@ionic-native/image-picker'; 
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {
  public profileDetails:any;
  public email:any;
  public password:any;
  public profileInterests:any;
  public local:any;
  public loaderCtrl:any;
  public interestList:any;
  public image_changed:any;
  CPPP=ChangeProfilePasswordPage;
  options:any;

  constructor(private transfer: FileTransfer,private imagePicker: ImagePicker, public appCtrl: App, public navCtrl: NavController, public mixoloWebService: MixoloEventService, public storage: Storage, public loader:LoadingController, public alertCtrl: AlertController) {
    this.image_changed="";
  }

  navigateAccount(){
    this.navCtrl.push(AccountPage);
  }
//By Default initialization function.
  ngOnInit(){
  this.loadSettingsData();
  }

  uploadProfileImageToServer(img){

    this.loaderCtrl=this.loader.create({
      content: 'Updating ...'
    }); 
    this.loaderCtrl.present();
    var rand=Math.random();
    rand=parseInt(rand.toString());
    var image_file_name=(rand*100000000);
    let option: FileUploadOptions = {
      fileKey:'profile_photo',
      mimeType:'multipart/form-data', 
      httpMethod:'POST',
      fileName:image_file_name+".png",
      params : {'User_ID': localStorage.getItem('user_id'),'action':'update_profile_photo'}
    };
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(img,atob("aHR0cDovL2FwcGRkaWN0aW9uc3R1ZGlvLmNvbS9taXhvbG8v"),option).then((result)=>{
      if(result.responseCode==200){
        this.loadSettingsData(); 
        this.loaderCtrl.dismiss();
      }
      },function(error)
              {
      
              });

  }

  changeProfileImage(){
    this.options=new Array();
    this.options['maximumImagesCount']=1;
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.uploadProfileImageToServer(results[i]);
          this.image_changed="";   
      }
    }, (err) => { });
  }

  navigateProfile(){
    this.navCtrl.push(ProfilesPage);
  }

  binEncode(data) {
    var binArray = []
    var datEncode = "";

    for (var i=0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2)); 
    } 
    for (var j=0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], '0', 8);
        datEncode += pad + ' '; 
    }
    function padding_left(s, c, n) { if (! s || ! c || s.length >= n) {
        return s;
    }
    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
        s = c + s; } return s;
    }
    console.log(binArray);
}

  updateProfile(){

    this.loaderCtrl=this.loader.create({
      content: 'Updating ...'
    });

     this.loaderCtrl.present();
      var firstName=this['first_name'];
      var lastName=this['last_name'];
      var email_id=this['user_email'];
      var location=this['location'];
      var user_id=localStorage.getItem('user_id');
      var Profile_Img="";  
      var Interests=this['interests'];
      var public_profile=this['public_profile'];
      var push_notification="";
      var app_sounds_vibrations="";
      var Date_Birth="";
      var Max_Distance="";
    
      this.mixoloWebService.updateProfileDetails(user_id,firstName,lastName,email_id,location,Date_Birth,Max_Distance,Profile_Img,Interests,public_profile,push_notification,app_sounds_vibrations).subscribe(response=>{
        //console.log(response);
        //this.loaderCtrl.dismiss();

            this.mixoloWebService.updateUserInterests(user_id,Interests).subscribe(response=>{
              //console.log(response); 
              this.loaderCtrl.dismiss();
            });

    });

  
  }
  
  

  attemptLogout(){
    this.loaderCtrl=this.loader.create({
        content: 'Logging Out ...'
      });

      this.loaderCtrl.present();

      localStorage.setItem('user_data',""); //Storage the data in a key value pair type of system.
      localStorage.setItem('password',"");
      localStorage.setItem('username',"");
      localStorage.setItem('user_id',"");

      this.loaderCtrl.dismiss();
      this.appCtrl.getRootNav().push(HomePage);
  }

  inArray(user_interest_id, needle_var){
      
      if(needle_var!=null || needle_var!="null"){
        var needle=JSON.parse(needle_var);
        if(needle !=null){
          for(var i=0;i<needle.length;i++){
            if(parseInt(needle[i]['Interest_ID'])==parseInt(user_interest_id)){
              return true;
            }
          }
        }
      }
    
    return false;
  }

  loadSettingsData(){
  
   var email=localStorage.getItem('username');
   var password=localStorage.getItem('password');
   var user_id=localStorage.getItem('user_id');

   this.profileDetails={};
   this.interestList=[];

   //Show all the interest,
   this.mixoloWebService.getAllInterests().subscribe(response=>{ 
    var userInterests=localStorage.getItem('user_interests');  
  if(response!=null){
    for(var i=0;i<response.length;i++){
      if(this.inArray(response[i]['ID'],userInterests)){
        response[i].selected=true;
      }
      else{
        response[i].selected=false;
      }
    }
  }
    this.interestList=response;

    //console.log(this.interestList);
   });

   //Show all the User Related Data.
   this.mixoloWebService.attemptLogin(email,password).subscribe(response=>{
        this.profileDetails=response['user_data'];
        console.log(this.profileDetails);
        this.profileDetails.Profile_Image=(this.profileDetails.Profile_Image)?atob("aHR0cDovL2FwcGRkaWN0aW9uc3R1ZGlvLmNvbS9taXhvbG8v")+"profile_photos/"+this.profileDetails.Profile_Image+"?"+Math.random():localStorage.getItem('social_profile_image');
        this['first_name']=this.profileDetails.First_Name;
        this['last_name']=this.profileDetails.Last_Name;
        this['user_email']=this.profileDetails.Email;
        this['location']=this.profileDetails.Location;
        this['public_profile']=(parseInt(this.profileDetails.public_profile))?true:false; 
    });

    
    this.profileInterests=[];
    this.mixoloWebService.getProfileInterests(user_id).subscribe(response=>{
        this.profileInterests=response;
    }); //WebService Call Ends here.

  }

  deactivateUserAccount(){

    this.mixoloWebService.deactiveAccount().subscribe(response=>{
      if(response.status=="success")
      {
        this.navCtrl.push(HomePage);
      }
    }); //WebService Call Ends here.
}

deactivateAccount(){

  var instance=this;
  let alert = this.alertCtrl.create({
    title:"Are you sure?",
    subTitle: "I want to deactivate my account?",
    buttons: [
      {text:"YES",handler:()=>{instance.deactivateUserAccount();}},
      {text:"NO"},
    ]
  });

  alert.present();
}


}  // Class Ends here.

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TabsPage } from '../tabs/tabs';
import { MixoloEventService} from '../../app/services/mixolo.events.service';

/**
 * Generated class for the FacebookLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-facebook-login',
  templateUrl: 'facebook-login.html',
})
export class FacebookLoginPage {

  public FacebookStatus:any;
  public userData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private facebook: Facebook, public mixoloWebService: MixoloEventService) {

    this.FacebookStatus="Attempting Login ...";
    this.FBLogin();
  }

  FBLogin(){
    
    var instance=this; 
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,last_name,location,picture.width(720).height(720).as(picture_large)',[]).then(profile => {
        this.userData = profile; 
        console.log(profile);
        localStorage.setItem('social_profile_image',profile.picture_large.data.url);
        instance.attemptLoginAndRegistration(this.userData); //It works
      });
    });
    
    //this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

  }
 
  //Attempt Login and Registration.
  attemptLoginAndRegistration(userData){
    //Check user exists or not.
    var instance=this;
    var first_name=userData.first_name;
    var last_name=userData.last_name;
    var email_id=userData.email;
    var pass="12345678";
    var dob="";
    var udid=btoa(email_id);
    
    //First Check user exists or not.
    this.mixoloWebService.attemptLogin(email_id,pass).subscribe(response=>{

          console.log("Login--",response);
          
          if(response.status=="success"){
              instance.loginSuccess(response); 
          }
          else{
              this.mixoloWebService.doRegistration(first_name,last_name,email_id,pass,dob,udid).subscribe(resp=>{
                console.log("Registration--",resp);
                if(resp.status=="success"){
                     // Login again, This will be a success for sure.
                      this.mixoloWebService.attemptLogin(email_id,pass).subscribe(response=>{
                        console.log(response);
                        instance.loginSuccess(response);
                      });
                }
              }); //Webservice call ends here.
          } 

    });
   

  } //_fun_

  loginSuccess(response){
    console.log('Logged into Facebook!', response);
    this.FacebookStatus="Loading, please wait...";
    
    localStorage.setItem('user_data',response.user_data); //Storage the data in a key value pair type of system.
    localStorage.setItem('password',"12345678");
    localStorage.setItem('username',response.user_data.Email);
    localStorage.setItem('user_id',response.user_data.ID); 

    this.navCtrl.push(TabsPage); 
    
  }

  loginFailed(e){
    console.log('Error logging into Facebook', e);
    this.FacebookStatus="Login Failed, please contact the administrator !"; 
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { TabsPage } from '../tabs/tabs';
import { MixoloEventService} from '../../app/services/mixolo.events.service';

/**
 * Generated class for the TwitterLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-twitter-login',
  templateUrl: 'twitter-login.html',
})
export class TwitterLoginPage {
  
  public TwitterStatus:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mixoloWebService: MixoloEventService, private twitter: TwitterConnect) {
    let env = this;
    //###############################
    this.twitter.login().then(function(result) {
      //Get user data
      env.twitter.showUser().then(function(user){
        //Save the user data in NativeStorage
        console.log(user);
        localStorage.setItem('social_profile_image',user.profile_image_url);
        env.attemptLoginAndRegistration(user); //It works
        }).then(function() {
          this.navCtrl.push(TabsPage);
        })
      }, function(error){
        console.log(error);
      });

    //###############################
  }

  attemptLoginAndRegistration(userData){
    //Check user exists or not.
    var instance=this;
    var twitter_name=userData.name;
    var name=twitter_name.split(" ");
    var first_name=name[0];
    var last_name=name[1];
    var email_id=userData.screen_name;
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
    this.TwitterStatus="Loading, please wait...";
    
    localStorage.setItem('user_data',response.user_data); //Storage the data in a key value pair type of system.
    localStorage.setItem('password',"12345678");
    localStorage.setItem('username',response.user_data.Email);
    localStorage.setItem('user_id',response.user_data.ID); 

    this.navCtrl.push(TabsPage); 
    
  }

  loginFailed(e){
    console.log('Error logging into Facebook', e);
    this.TwitterStatus="Login Failed, please contact the administrator !"; 
  }

  onError(response){

  }

  
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { TabsPage} from '../tabs/tabs';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ForgotPasswordPage } from '../forgot_password/forgot_password';
import { RegistrationPage } from '../registration/registration';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  login;
  forgotPassword=ForgotPasswordPage;
  Register=RegistrationPage;
  public loaderCtrl:any; 
  
  constructor(public navCtrl: NavController,
   private mixoloEvents:MixoloEventService,
   public alertCtrl: AlertController,
   public storage: Storage,
   public loader: LoadingController) {
     
    this.loaderCtrl=this.loader.create({
      content: 'Authenticating ...'
    });

  }

  //By Default Lifecycle Event.
  ngOnInit(){
    this['login_email']="balu@test.com";
    //this['login_email']="doru.arfire.1279@gmail.com";
    this['login_password']="test";
    
  }
  //I guess we have to use the normal XMLHTTP request.
 validate(){
     var data=new Array();
  }

  attemptLogin(){

    var instance=this;
    var email=instance['login_email'];
    var password=instance['login_password'];
    if(this.validationOK()==false){
     return false;
    }

    this.loaderCtrl.present();
     
    this.mixoloEvents.attemptLogin(email,password).subscribe(response=>{
          console.log(response);
          instance.loaderCtrl.dismiss();
        if(response.status=="failed"){
            let alert = this.alertCtrl.create({
                              title: 'Login Failed',
                              subTitle: 'Invalid Credentials,<br> Please try again !',
                              buttons: ['Dismiss']
                            });
                alert.present();
          }
          if(response.status=="suspended"){
              let alert = this.alertCtrl.create({
                title: 'Login Failed',
                subTitle: 'Your account has been suspended, please contact the administrator of active your account!',
                buttons: ['Dismiss']
              });
              alert.present();
          }
          else{
            localStorage.setItem('user_data',response.user_data); //Storage the data in a key value pair type of system.
            localStorage.setItem('password',password);
            localStorage.setItem('username',email);
            localStorage.setItem('user_id',response.user_data.ID);
            this.navCtrl.push(TabsPage);
          }
     });

  }

  validationOK(){
    var error_message="";
    if(this['login_email']==""){
    error_message+="<li>Please Enter your email address !</li>";
    }
    if(this['login_password']==""){
      error_message+="<li>Please enter you password !</li>";
    }

    if(error_message!=""){  
       let alert = this.alertCtrl.create({
        title: 'Operation Failed !',
        subTitle: "<ul class='rating_validation_message'>"+error_message+"</ul>",
        buttons: ['Dismiss']
      });

      alert.present();
      return false;
    }
    if(error_message==""){
     return true;
    }
    
  }

}//Class Ends here.


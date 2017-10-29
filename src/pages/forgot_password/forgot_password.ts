import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import {LoadingController} from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  selector: 'forgot_password',
  templateUrl: 'forgot_password.html'
})
export class ForgotPasswordPage {
  
  public loaderCtrl:any;
  public show:boolean=false;
  
  constructor(public navCtrl: NavController,
   private mixoloEvents:MixoloEventService,
   public alertCtrl: AlertController,
   public loader: LoadingController) {
  
  }

  //By Default Lifecycle Event.
  ngOnInit(){
    this['email_address']="doru.arfire.1279@gmail.com";
  }

  sendOTP(){
      if(this.validate()==true){
       
        this.loaderCtrl=this.loader.create({
          content: 'Authenticating ...'
        });

        this.loaderCtrl.present();
        var email_address=this['email_address'];
            this.mixoloEvents.sendEmailOTP(email_address).subscribe(response=>{
                    console.log(response);
                    this.loaderCtrl.dismiss();
                    if(response.status=="failed")
                    {
                        let alert = this.alertCtrl.create({
                            title: 'Alert',
                            subTitle: response.error,
                            buttons: [{text:'Dismiss'}]
                          });
                        alert.present(); 
                    }
                    else{
                        let alert = this.alertCtrl.create({
                            title: 'Alert',
                            subTitle: "OTP has been sent your email address !",
                            buttons: [{text:'Dismiss',handler:()=>{
                              this.show=true;
                            }}]
                          });
                        alert.present();
                    }
            });
      }
  }

  changePassword(){
     var email_address=this['email_addr'];
     var otp=this['otp'];
     var new_password=this['new_password'];

     this.loaderCtrl=this.loader.create({
      content: 'Changing Credentials ...'
     });
   
    this.loaderCtrl.present();

      this.mixoloEvents.changePassword(email_address,otp,new_password).subscribe(response=>{
        this.loaderCtrl.dismiss();
              //console.log(response);
              if(response.status=="failed")
              {
                  let alert = this.alertCtrl.create({
                      title: 'Alert',
                      subTitle: response.error,
                      buttons: [{text:'Dismiss'}]
                    });
                  alert.present(); 
              }
              else{
                  let alert = this.alertCtrl.create({
                      title: 'Alert',
                      subTitle: "Password has been changed successfully !",
                      buttons: [{text:'Dismiss',handler:()=>{
                        this.navCtrl.push(LoginPage);
                      }}]
                    });
                  alert.present();
              }
        });
  }  
  
 validate(){
     var email_address=this['email_address'];
     if(email_address==""){
        let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'Please enter your registered email address !',
            buttons: ['Dismiss']
          });
        alert.present();
      return false;
     }
     else{
         return true;
     }
  }


}//Class Ends here.


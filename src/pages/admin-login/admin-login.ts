import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';  
import { AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ThanksAdminPage } from '../thanks-admin/thanks-admin';
import { ForgotPasswordPage } from '../forgot_password/forgot_password';

/**
 * Generated class for the AdminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {
  public loaderCtrl:any; 
  forgotPassword=ForgotPasswordPage;

  constructor(public navCtrl: NavController,
    private mixoloEvents:MixoloEventService,
    public alertCtrl: AlertController,
    public loader: LoadingController) {
 
   }

  attemptAdminLogin(){

    var instance=this;
    var email=this['admin_email'];
    var password=this['admin_password'];

    if(this.validationOK()==false){
     return false;
    }
    this.loaderCtrl=this.loader.create({
      content: 'Authenticating ...'
    });
    this.loaderCtrl.present();
     
    this.mixoloEvents.attemptAdminLogin(email,password).subscribe(response=>{
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
            localStorage.setItem('admin_user_data',JSON.stringify(response.organizer)); //Storage the data in a key value pair type of system. 
            localStorage.setItem('admin_password',password);
            localStorage.setItem('admin_username',email);
            localStorage.setItem('admin_user_id',response.user.user_id);
            this.navCtrl.push(ThanksAdminPage);
          }
     });


  }


  
  validationOK(){
    var error_message="";
    if(this['admin_email']==""){
    error_message+="<li>Please Enter your email address !</li>";
    }
    if(this['admin_password']==""){
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



} // Class ends here.

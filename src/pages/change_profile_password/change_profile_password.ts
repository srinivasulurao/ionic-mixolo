import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { Storage } from '@ionic/storage';
import { LoadingController} from "ionic-angular";
import { AlertController} from 'ionic-angular';

@Component({
  selector: 'change_profile_password',
  templateUrl: 'change_profile_password.html'
})
export class ChangeProfilePasswordPage {
  public profileDetails:any;
  public email:any;
  public password:any;
  public loaderCtrl:any;

  constructor(public navCtrl: NavController, public mixoloWebService: MixoloEventService,public alertCtrl:AlertController, public storage: Storage, public loader:LoadingController) {
    
  }
  updateProfilePassword(){
    // this.loaderCtrl.present();
    //   var firstName=this['first_name'];
    if(this.validatePasswords()){
        var user_id=localStorage.getItem('user_id');
        var pwd=this['password1'];

        this.loaderCtrl=this.loader.create({
            content: 'Updating ...'
          });      

          this.loaderCtrl.present();
        
        this.mixoloWebService.updateProfilePassword(user_id,pwd).subscribe(response=>{
            console.log(response);
            this.loaderCtrl.dismiss();
            let alert = this.alertCtrl.create({
                title: 'Operation Success',
                subTitle: 'Password has been changed successfully !',
                buttons: ['Dismiss']
              });
            alert.present();
        });
    }

  }//Update function ends here.

  validatePasswords(){
    var pwd1=this['password1'];
    var pwd2=this['password2'];

    if(pwd1!=pwd2){
        let alert = this.alertCtrl.create({
            title: 'Operation Failed',
            subTitle: 'Passwords are not matching !',
            buttons: ['Dismiss']
          });
        alert.present();
        return false;
    }
    else if(pwd1==null || pwd2==null){
        let alert = this.alertCtrl.create({
            title: 'Operation Failed',
            subTitle: 'Please enter the missing fields !',
            buttons: ['Dismiss']
          });
        alert.present();
        return false;
    }
    else{
        return true;
    }

  } //Validation Function Ends.

  //By Default initialization function.
  ngOnInit(){
   
  }

  


}  // Class Ends here.

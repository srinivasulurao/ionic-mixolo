import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { LoadingController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  selector: 'registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  public profileDetails:any;
  public email:any;
  public password:any;
  public profileInterests:any;
  public local:any;
  public loaderCtrl:any;

  //Constructor
  constructor(public navCtrl: NavController,
    public mixoloWebService: MixoloEventService,
    public loader: LoadingController,
    public alertCtrl: AlertController) {

  }

  //By Default initialization function.
  ngOnInit(){
  
  }

  attemptRegistration(){

      var first_name=this['first_name'];
      var last_name=this['last_name'];
      var email_id=this['email_id'];
      var pass=this['pwd'];
      var dob=this['dob'];
      var udid=btoa(email_id); //Base 64 encoded string.
this.loaderCtrl=this.loader.create({
        content: 'Registering Account ...'
});


 if(this.validation()==true){

    this.loaderCtrl.present();
      var instance=this;
      this.mixoloWebService.doRegistration(first_name,last_name,email_id,pass,dob,udid).subscribe(response=>{
        //console.log(response);
        instance.loaderCtrl.dismiss();
        if(response.status=="failed"){
            let alert = this.alertCtrl.create({
                                title: 'Operation Failed',
                                subTitle: 'Invalid Credentials,<br> Please try again !',
                                buttons: ['Dismiss']
                            });
                alert.present();
        }
        else{
                let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Registration Successful, please login using your account credentials !',
                    buttons: [{text:'Dismiss', handler:()=>{
                        this.navCtrl.push(LoginPage);
                    }}]
                });
               alert.dismiss();
         }
    }); //Webservice call ends here.
   }//If Condition ends here.
  }
  
  validation(){
    var error_message="";
    if(this['first_name']=="" || this['first_name']==null){
      error_message+="<li>First name is required !</li>";
    }
    if(this['last_name']=="" || this['last_name']==null){
      error_message+="<li>Last name is required !</li>";
    }

    if(this['email_id']=="" || this['email_id']==null){
        error_message+="<li>Email is required!</li>";
    }

    if(this['pwd']=="" || this['pwd']==null){
        error_message+="<li>Password is required!</li>";
    }

    if(this['conf_pwd']=="" || this['conf_pwd']==null){
        error_message+="<li>Confirmation password is required!</li>";
    }

    if(this['pwd']!=this['conf_pwd']){
       error_message+="<li>Passwords are not matching!</li>";
    }

    if(this['dob']=="" || this['dob']==null){
       error_message+="<li>Date of birth is required!</li>"; 
    }

    if (/\d/.test(this['pwd'])==false) {
        error_message+="<li>Password should contain atleast one numeric letter!</li>";
    }

    if(/[A-Z]/.test(this['pwd'])==false){
        error_message+="<li>Password should contain atleast one uppercase letter!</li>";
    }
   
    if(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this['pwd'])==false){
        error_message+="<li>Password should contain atleast one special character!</li>";
    }

    if(/[a-z]/.test(this['pwd'])==false){
        error_message+="<li>Password should contain atleast one lowercase letter!</li>";
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

 
  showPasswordGuidelines(){
    let alert = this.alertCtrl.create({
        title: 'Password must be atleast 8 character long and contain the following.',
        subTitle: "<ul class='rating_validation_message' ><li>Atleast one uppercase</li><li>Atleast one lower case letter</li><li>Atleast one numerical digit</li><li>Atleast one special character such as @, #, $</ul>",
        buttons: ['Dismiss']
    });
    alert.present();
  }
 



}  // Class Ends here.

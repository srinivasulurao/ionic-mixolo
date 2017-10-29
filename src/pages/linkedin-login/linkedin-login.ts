import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LinkedIn, LinkedInLoginScopes  } from '@ionic-native/linkedin';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LinkedinLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-linkedin-login',
  templateUrl: 'linkedin-login.html',
})

export class LinkedinLoginPage {

  scopes: LinkedInLoginScopes[] = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
  isLoggedIn: boolean = false;
  selfData = { id:"", firstName:"", lastName:"" };

  public LoginStatus:any;
  public scope:any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, private linkedin: LinkedIn) {
    this.LoginStatus="Attempting Login...";
    this.LinkedInLogin();   
  }

  LoginSuccess(){
      this.LoginStatus="Loading, please wait..."; 
      this.navCtrl.push(TabsPage);
  }

  LoginFailed(){
      this.LoginStatus="Login Failed, Please contact the administrator !"; 
  }

  ionViewDidAppear() {
    this.linkedin.hasActiveSession().then((active) => {
       console.log("linked session active");
    });
}

  LinkedInLogin(){

    this.linkedin.login(this.scopes, true)
    .then(() => {
      this.isLoggedIn = true;
      console.log("hello");
      this.getSelfData();
    })
    .catch(e => console.log('Error logging in', e));

  } //LoginFunction ends here.


  getSelfData() {
    this.linkedin.getRequest('people/~')
      .then(res => {
        this.selfData = res;
        //this.openProfile(res.id);
      })
      .catch(e => console.log(e));
  }


}//Class Ends here.

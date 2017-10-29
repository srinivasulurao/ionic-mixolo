import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { FacebookLoginPage } from '../facebook-login/facebook-login';
import { TwitterLoginPage } from '../twitter-login/twitter-login';
import { LinkedinLoginPage } from  '../linkedin-login/linkedin-login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public items;
  tabsPage = TabsPage;
  login=LoginPage;
  constructor(public navCtrl: NavController) {

  }

  //By Default initialization function.
  ngOnInit(){
    this.getLoginOptions();
  }
   navigate(page) {
     if(page=="login")
       this.navCtrl.push(LoginPage);
     if(page=="facebook")
       this.navCtrl.push(FacebookLoginPage);
     if(page=="linkedin")
       this.navCtrl.push(LinkedinLoginPage);
     if(page=="twitter")
       this.navCtrl.push(TwitterLoginPage);
  }
   getLoginOptions(){
     this.items=[
                  {name:"Email",icon:"assets/icon/email-icon.png",redirection:"login"},
                  {name:"Facebook",icon:"assets/icon/facebook-icon.png",redirection:"facebook"},
                  {name:"LinkedIn",icon:"assets/icon/linkedin-icon.png",redirection:"linkedin"},
                  {name:"Twitter",icon:"assets/icon/twitter-icon.png",redirection:"twitter"}
               ];
      
   }

}  // Class Ends here.

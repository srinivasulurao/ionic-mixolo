import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminLoginPage } from "../admin-login/admin-login";
import { App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the WowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-wow',
  templateUrl: 'wow.html',
}) 
export class WowPage {

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  openAdmin(){
    //this.navCtrl.push(AdminLoginPage); 
    this.appCtrl.getRootNav().push(AdminLoginPage);
  }

  skipTutorial(){
    this.appCtrl.getRootNav().push(AdminLoginPage);
  }

  cancelTutorial(){
    this.navCtrl.push(TabsPage);
  }

}

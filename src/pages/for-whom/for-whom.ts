import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
import { AdminLoginPage } from "../admin-login/admin-login";
/**
 * Generated class for the ForWhatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-for-whom',
  templateUrl: 'for-whom.html',
}) 
export class ForWhomPage {

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  SwitchTab(){
    this.navCtrl.parent.select(3);
  }


  skipTutorial(){
    this.appCtrl.getRootNav().push(AdminLoginPage);
  }

  cancelTutorial(){
    this.navCtrl.push(TabsPage);
  }


}

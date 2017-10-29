import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WhatPage } from "../what/what";
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
import { AdminLoginPage } from "../admin-login/admin-login";

/**
 * Generated class for the WhoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-who',
  templateUrl: 'who.html',
})
export class WhoPage {

  tab1Root=WhatPage;

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  SwitchTab(){
    this.navCtrl.parent.select(1); //Selects the first tab
  }

  skipTutorial(){
    this.appCtrl.getRootNav().push(AdminLoginPage);
  }

  cancelTutorial(){
    this.navCtrl.push(TabsPage);
  }

}

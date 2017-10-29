import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{WhoPage} from '../who/who';
import{WhatPage} from '../what/what';
import{ForWhomPage} from '../for-whom/for-whom'; 
import{WowPage} from '../wow/wow';
/**
 * Generated class for the HostEventDocumentationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-host-event-documentation',
  templateUrl: 'host-event-documentation.html',
})
export class HostEventDocumentationPage {

  tab1Root = WhoPage;
  tab2Root = WhatPage;
  tab3Root = ForWhomPage;
  tab4Root = WowPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}

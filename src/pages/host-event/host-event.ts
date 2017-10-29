import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HostEventDocumentationPage } from "../host-event-documentation/host-event-documentation";
/**
 * Generated class for the HostEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-host-event',
  templateUrl: 'host-event.html',
})
export class HostEventPage {
hostEventDocumentation=HostEventDocumentationPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}

import { Component } from '@angular/core';

import{EventsPage} from '../events/events';
import{ChatsPage} from '../chats/chats';
import{FindsPage} from '../finds/finds'; 
import{ProfilesPage} from '../profiles/profiles';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FindsPage;
  tab2Root = EventsPage;
  tab3Root = ChatsPage;
  tab4Root = ProfilesPage;

  constructor(public navCtrl: NavController) {

  }




}

import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { LoadingController} from "ionic-angular";
import { NotificationPage } from "../notification/notification";
import { PremiumPage } from "../premium/premium";
import { FeedbackPage } from "../feedback/feedback";
import { SyncCalendarPage } from "../sync-calendar/sync-calendar";
import { HostEventPage } from "../host-event/host-event";

import { AboutMixoloPage } from "../about-mixolo/about-mixolo";
import { HowMixoloWorksPage } from "../how-mixolo-works/how-mixolo-works";
import { PoliciesPage } from "../policies/policies";
import { HelpPage } from "../help/help";
import { TermsConditionsPage } from "../terms-conditions/terms-conditions";
import { PrivacyPage } from "../privacy/privacy";
import { MixChatPage } from "../mix-chat/mix-chat";


@Component({
  selector: 'account',
  templateUrl: 'account.html'
})
export class AccountPage {
 
  public loaderCtrl:any;

  premium=PremiumPage;
  feedback=FeedbackPage;
  sync_calendar=SyncCalendarPage;
  host_event=HostEventPage;
  notification=NotificationPage;
  public show:boolean=false;

  about_mixolo=AboutMixoloPage;
  how_mixolo_works=HowMixoloWorksPage;
  policies=PoliciesPage;
  help=HelpPage;
  terms_conditions=TermsConditionsPage;
  privacy=PrivacyPage;
  mix_chat=MixChatPage;
  hostEvent=HostEventPage;

  constructor(public navCtrl: NavController, public mixoloWebService: MixoloEventService, public loader:LoadingController, public appCtrl: App) {
    this['show_sub_menu']=0;
  }

  navigateHostEvent(){
    this.appCtrl.getRootNav().push(HostEventPage);
  }

  subMenuVisibility(){
    
    var sv=this['show_sub_menu'];
    if(sv){
      this.show=false;
      this['show_sub_menu']=0;
    }
    else{
      this.show=true;
      this['show_sub_menu']=1;
    }
  }
  

}  // Class Ends here.

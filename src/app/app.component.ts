import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MixoloEventService} from './services/mixolo.events.service'
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { EventsPage } from '../pages/events/events';
import { ChatsPage } from '../pages/chats/chats';
import { ChatWindowPage } from "../pages/chat-window/chat-window";
import { ChatMultiplePage } from "../pages/chat-multiple/chat-multiple";
import { MultiChatWindowPage } from "../pages/multi-chat-window/multi-chat-window";
import { FindsPage } from '../pages/finds/finds'; 
import { ProfilesPage } from '../pages/profiles/profiles';
import { EventDetailsPage } from '../pages/event_details/event_details';
import { SettingsPage } from '../pages/settings/settings';
import { ChangeProfilePasswordPage } from '../pages/change_profile_password/change_profile_password';
import { ForgotPasswordPage } from '../pages/forgot_password/forgot_password';
import { RegistrationPage } from '../pages/registration/registration';
import { AccountPage } from "../pages/account/account";
import { NotificationPage } from "../pages/notification/notification";
import { PremiumPage } from "../pages/premium/premium";
import { FeedbackPage } from "../pages/feedback/feedback";
import { SyncCalendarPage } from "../pages/sync-calendar/sync-calendar";
import { HostEventPage } from "../pages/host-event/host-event";
import { AboutMixoloPage } from "../pages/about-mixolo/about-mixolo";
import { HowMixoloWorksPage } from "../pages/how-mixolo-works/how-mixolo-works";
import { PoliciesPage } from "../pages/policies/policies";
import { HelpPage } from "../pages/help/help";
import { TermsConditionsPage } from "../pages/terms-conditions/terms-conditions";
import { PrivacyPage } from "../pages/privacy/privacy";
import { MixChatPage } from "../pages/mix-chat/mix-chat";
import { LikePage } from "../pages/like/like";
import { FilterPage } from "../pages/filter/filter";  
import { HostEventDocumentationPage} from '../pages/host-event-documentation/host-event-documentation';
import { WhoPage } from '../pages/who/who';
import { WhatPage } from '../pages/what/what';
import { ForWhomPage } from '../pages/for-whom/for-whom'; 
import { WowPage } from '../pages/wow/wow';
import { AdminLoginPage } from "../pages/admin-login/admin-login";
import { ThanksAdminPage } from '../pages/thanks-admin/thanks-admin';
import { MakePersonalPage} from '../pages/make-personal/make-personal';
import { ReviewHostingStandardPage } from '../pages/review-hosting-standard/review-hosting-standard';
import { TellUsAboutEventPage } from '../pages/tell-about/tell-about';
import { EventTitlePage } from  '../pages/event-title/event-title';
import { EventTaglinePage } from  '../pages/event-tagline/event-tagline';
import { ScheduleTimePage } from '../pages/schedule-time/schedule-time';
import { SetPricePage } from '../pages/set-price/set-price';
import { SetDescriptionPage } from '../pages/set-description/set-description';
import { SetEventAddressPage } from '../pages/set-event-address/set-event-address';
import { EventPhotoUploadPage } from '../pages/event-photo-upload/event-photo-upload';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { LinkedIn, LinkedInLoginScopes  } from '@ionic-native/linkedin'; 
import { GuestOfferingPage } from '../pages/guest-offering/guest-offering';
import { AdditionalEventInfoPage } from '../pages/additional-event-info/additional-event-info';
import { DigitalFootprintPage } from '../pages/digital-footprint/digital-footprint';
import { FacebookLoginPage } from '../pages/facebook-login/facebook-login';
import { LinkedinLoginPage } from '../pages/linkedin-login/linkedin-login';
import { TwitterLoginPage } from '../pages/twitter-login/twitter-login';

@Component({
  templateUrl: 'app.html',
  providers:[MixoloEventService]
})
export class MyApp {

  rootPage: any = HomePage; 

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide(); 
    });
  }

  
}

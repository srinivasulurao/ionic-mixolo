import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import {LoadingController} from 'ionic-angular';
import { ChatsPage } from '../chats/chats';
/**
 * Generated class for the MultiChatWindowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-multi-chat-window',
  templateUrl: 'multi-chat-window.html',
})
export class MultiChatWindowPage {

  chat_users:any;
  chat_header:any;

  constructor(public navCtrl: NavController, private navParams:NavParams,public alertCtrl: AlertController, public mixoloWS:MixoloEventService,public loader: LoadingController) {

    var heading=[];
    this.chat_users=navParams.get("MultiChatUserList");   
    for(var i=0;i<this.chat_users.length;i++){
     heading[i]=this.chat_users[i]['First_Name']+" "+this.chat_users[i]['Last_Name'];
    }
    
    this.chat_header=heading.join(",");

  }

  sendMessage(){
    var typed_message=this['typed_message'];
    var instance=this;
    var error_exists=0;
    for(var j=0;j<this.chat_users.length;j++){
    var chat_user=this.chat_users[j]['ID'];
    this.mixoloWS.addNewChatMessage(typed_message,chat_user).subscribe(response=>{
      if(response.status=="success"){
        instance['typed_message']=""; //Empty the message writting box.
        //instance.getNewUnreadMessages();  
      }
      else{
        error_exists=1;
        const alert = this.alertCtrl.create({
          title: response.status,
          message: response.user_status,
          buttons: [{text: 'DISMISS'}]
        });
        alert.present();
      }      
     });

    } //For Loop ends here.

    if(!error_exists){
      this.navCtrl.push(ChatsPage);
    }

  }
   

} //Class Ends here.

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import {LoadingController} from 'ionic-angular';
/**
 * Generated class for the ChatWindowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat-window',
  templateUrl: 'chat-window.html',
})
export class ChatWindowPage {
  public chat_user:any;
  public chat_user_last_name:any;
  public chat_user_first_name:any;
  public loaderCtrl:any;
  public chatMessages:any;
  public userStatus:any;

  constructor(public navCtrl: NavController, private navParams:NavParams,public alertCtrl: AlertController, public mixoloWS:MixoloEventService,public loader: LoadingController) {
    this.chat_user=navParams.get("chat_user");    
    this.chat_user_first_name=navParams.get('First_Name');
    this.chat_user_last_name=navParams.get("Last_Name");
   
    this.getChatMessages(this.chat_user,true);

        //Based on the availability of a new message, that makes sense.
        var instance=this;
        setInterval(function(){
          instance.getNewUnreadMessages();
        },3000);

  }
  doMore(){
    var instance=this;
      if(this.userStatus!="Blocked"){
            let alert = this.alertCtrl.create({
              title: this.chat_user_first_name+" "+this.chat_user_last_name,
              subTitle: "",
              buttons: [
                {text:"BLOCK",handler:()=>{instance.blockUser();}},
                {text:"DELETE CONVERSATION",handler:()=>{instance.deleteConversation()}},
                {text:"REPORT",handler:()=>{instance.reportUser();}},
                {text:"Cancel"}
              ]
            });

            alert.present();
      }
      else{
          let alert = this.alertCtrl.create({
            title: this.chat_user_first_name+" "+this.chat_user_last_name,
            subTitle: "",
            buttons: [
              {text:"UNBLOCK",handler:()=>{instance.unBlockUser();}},
              {text:"DELETE CONVERSATION",handler:()=>{instance.deleteConversation()}},
              {text:"REPORT",handler:()=>{instance.reportUser();}},
              {text:"Cancel"}
            ]
          });

          alert.present();
      }
    

  }

  unBlockUser(){

    var instance=this;
    const alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Unblocking this connection will allow them to reconnect with you',
      buttons: [
        {
          text: 'UNBLOCK',
          handler: () => {
          
                  this.mixoloWS.unBlockSecondUser(instance.chat_user).subscribe(response=>{    
                  if(response.status=="success"){
                    instance.userStatus="Active";
                  }   
                   });
          }
        },
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  blockUser(){

    var instance=this;
      this.mixoloWS.blockSecondUser(this.chat_user).subscribe(response=>{    
      if(response.status=="success"){
        instance.userStatus="Blocked";
      }
    });

  }

  deleteConversation(){

    var instance=this;
    const alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'If you delete this conversation, you will not be able to recieve these messages.',
      buttons: [
        {
          text: 'DELETE',
          handler: () => {

            this.mixoloWS.deleteSecondUserConversation(instance.chat_user).subscribe(response=>{    
              instance.getChatMessages(instance.chat_user,false);
            });

          }
        },
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();

    
  }

  reportUser(){
    var instance=this;
    const alert = this.alertCtrl.create({
      title: 'Report User',
      inputs: [
        {
          name: 'report_message',
          placeholder: 'Report User'
        },
      ],
      buttons: [
        {
          text: 'REPORT',
          handler: data => {

            this.mixoloWS.reportSecondUser(instance.chat_user,data.report_message).subscribe(response=>{    
              console.log(response);
            });

          }
        },
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  getChatMessages(chat_user,showLoader){
    if(showLoader){
        this.loaderCtrl=this.loader.create({
          content: 'Loading...'
        });
        this.loaderCtrl.present();
    }
        
        this.chatMessages={};
        this.mixoloWS.getChatMessages(chat_user,0,2000).subscribe(response=>{
          var user_id=localStorage.getItem('user_id');
          if(response.messages!=null){
          for(var i=0;i<response.messages.length;i++){
            if(response.messages[i].From_User==user_id){
              response.messages[i].align="right";
            }
            else{
              response.messages[i].align="left";
            }
          }
        }

          console.log(response);
          this.chatMessages=response;
          this.userStatus=response.user_status;
          this.loaderCtrl.dismiss();
          
    });
  }

  getNewUnreadMessages(){
    var instance=this;
      this.mixoloWS.getNewUnreadChatMessage(this.chat_user).subscribe(response=>{    
       if(parseInt(response.unread) > 0){
         instance.getChatMessages(instance.chat_user,false);
       }
    });
  }

  sendMessage(){
    var typed_message=this['typed_message'];
    var instance=this;
    this.mixoloWS.addNewChatMessage(typed_message,this.chat_user).subscribe(response=>{
      if(response.status=="success"){
        instance['typed_message']=""; //Empty the message writting box.
        instance.getChatMessages(instance.chat_user,false);
        //instance.getNewUnreadMessages();  
      }
      else{
        const alert = this.alertCtrl.create({
          title: response.status,
          message: response.user_status,
          buttons: [{text: 'DISMISS'}]
        });
        alert.present();
      }
      
});

  }


}

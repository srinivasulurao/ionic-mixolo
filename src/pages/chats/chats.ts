import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import {LoadingController} from 'ionic-angular';
import { ChatWindowPage } from "../chat-window/chat-window";
import {ChatMultiplePage } from '../chat-multiple/chat-multiple'; 

@Component({
  selector: 'chat-messages',
  templateUrl: 'chats.html'
})
export class ChatsPage {
  public loaderCtrl:any;
  public chatUserList:any;
  public userList:any;  
  public pic_dir:any;

  //Constructor page.
  constructor(public navCtrl: NavController,
   private mixoloEvents:MixoloEventService,
   public alertCtrl: AlertController,
   public loader: LoadingController) {

    this.pic_dir=atob("aHR0cDovL2FwcGRkaWN0aW9uc3R1ZGlvLmNvbS9taXhvbG8v")+"profile_photos/";

  }

  //By Default initialization function.
  ngOnInit(){
    this.getUserList();
    this.getChatUserList();
    
  }

  navigateMultiple(){
    this.navCtrl.push(ChatMultiplePage);
  }

  startChat(chat_with,first_name,last_name){
   this.navCtrl.push(ChatWindowPage,{chat_user:chat_with,First_Name:first_name,Last_Name:last_name});
  }
  
  getChatUserList(){
        this.loaderCtrl=this.loader.create({
          content: 'Loading...'
        });
        this.loaderCtrl.present();
        
        this.chatUserList={};
        this.mixoloEvents.getUserListByChatOrder().subscribe(response=>{
          //console.log(response);
          this.chatUserList=response;
          this.loaderCtrl.dismiss();
          
    });

        
  }


  getUserList(){
    this.userList=[];
    this.mixoloEvents.getUserList().subscribe(response=>{
      //console.log(response); 
       this.userList=response;
    });
  }


}  // Class Ends here.

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MixoloEventService } from '../../app/services/mixolo.events.service';
import { LoadingController } from 'ionic-angular';
import { MultiChatWindowPage } from '../multi-chat-window/multi-chat-window'; 
/**
 * Generated class for the ChatMultiplePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat-multiple',
  templateUrl: 'chat-multiple.html',
})
export class ChatMultiplePage {

  public loaderCtrl:any;
  public chatUserList:any;
  public selectedChatUsers={};

  constructor(public navCtrl: NavController,
    private mixoloEvents:MixoloEventService,
    public alertCtrl: AlertController,
    public loader: LoadingController) {
 
   }

   ngOnInit(){
    this.getChatUserList();
    
  }

  navigateChatMultipleUserWindow(){
    this.loaderCtrl=this.loader.create({
      content: 'Loading...'
    });
    this.loaderCtrl.present();

    var selected_chat_users=new Array();
    var pass_data=new Array();
    //console.log(this.chatUserList);
    // console.log(selected_chat_users);
   var k=0;
    for(var j in this['selectedChatUsers']){
      selected_chat_users[k]=parseInt(j);
      k++;   
    }

    var counter=0;
    for(var i=0;i<this.chatUserList.users.length;i++){
      var id=this.chatUserList.users[i].id;
      for(var l=0;l<selected_chat_users.length;l++){
        if(selected_chat_users[l]==id){
        pass_data[counter]=new Array();
        pass_data[counter]['ID']=id;
        pass_data[counter]['First_Name']=this.chatUserList.users[i].First_Name;
        pass_data[counter]['Last_Name']=this.chatUserList.users[i].Last_Name;
        counter++;
        }
      } 
    }

    //Fetch Data & Navigate.
    this.loaderCtrl.dismiss();

    if(counter < 3){
        let alert = this.alertCtrl.create({
          title: 'Operation Failed',
          subTitle: 'Minimum 3 users needed to send !',
          buttons: ['Dismiss']
        });
        alert.present();
    }
    else{
          this.navCtrl.push(MultiChatWindowPage,{MultiChatUserList:pass_data});
    }


  } // FUnction ends here.
  

   getChatUserList(){
    this.loaderCtrl=this.loader.create({
      content: 'Loading...'
    });
    this.loaderCtrl.present();
    
    this.chatUserList={};
    this.mixoloEvents.getUserListByChatOrder().subscribe(response=>{
      this.chatUserList=response;
      this.loaderCtrl.dismiss();
      
});

    
}

}

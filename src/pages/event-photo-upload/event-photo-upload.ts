import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
import { LoadingController} from "ionic-angular";
import { GuestOfferingPage } from '../guest-offering/guest-offering';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the EventPhoneUploadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-event-photo-upload',
  templateUrl: 'event-photo-upload.html',
})
export class EventPhotoUploadPage {
 public image_one:any;
 public file_binary_one:any;
 public image_two:any;
 public image_three:any;
 public image_four:any;
 public image_five:any;
 public loaderCtrl:any;

  constructor(private transfer: FileTransfer, public loader:LoadingController,private alertCtrl:AlertController,private file: File,private imagePicker: ImagePicker, public navCtrl: NavController, public navParams: NavParams) {
    this.image_one="";
    this.image_two="";
    this.image_three="";
    this.image_four="";
    this.image_five="";

  }

  removePic(pic_no){
    var pn=parseInt(pic_no);
    
    if(pn==1){
      this.image_one="";
    }
    if(pn==2){
      this.image_two="";
    }
    if(pn==3){
      this.image_three="";
    }
    if(pn==4){
      this.image_four="";
    }
    if(pn==5){
      this.image_five="";
    }

  }

  addCameraImage(){
    var options={maximumImagesCount:1,outputType:0};
    var reader=new FileReader();
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        //console.log(results);
        if(this.image_one=="" || this.image_one==null){
            this.image_one=results[i];
            return false;
        }
        if(this.image_two=="" && this.image_one){
            this.image_two=results[i];
            return false;
        }
        if(this.image_three=="" && this.image_two){
            this.image_three=results[i];
            return false;
        }
        if(this.image_four=="" && this.image_three){
            this.image_four=results[i];
            return false;
        }
        if(this.image_five=="" && this.image_four){
            this.image_five=results[i];
            return false; 
        }
       
      }
    }, (err) => { });

  } //function ends here.


  goNext(){
    
    localStorage.setItem('event_image_one',"");
    localStorage.setItem('event_image_two',"");
    localStorage.setItem('event_image_three',"");
    localStorage.setItem('event_image_four',"");
    localStorage.setItem('event_image_five',"");
    
    
       if(this.image_one=="" && this.image_two=="" && this.image_three=="" && this.image_four=="" && this.image_five==""){
            let alert = this.alertCtrl.create({
              title: 'Operation Failed',
              subTitle: 'Please select atleast one image !',
              buttons: ['Dismiss']
            });
            alert.present();
       }
       else{

        this.loaderCtrl=this.loader.create({
          content: 'Uploading Images ...'
        }); 
    
        this.loaderCtrl.present();
        
        //Upload the images
        if(this.image_one)
          this.uploadImages(this.image_one,1);
        if(this.image_two)
          this.uploadImages(this.image_two,2);
        if(this.image_three)
          this.uploadImages(this.image_three,3);
        if(this.image_four)
          this.uploadImages(this.image_four,4);
        if(this.image_five)
          this.uploadImages(this.image_five,5);

        this.loaderCtrl.dismiss();
        this.navCtrl.push(GuestOfferingPage);

       }
  }

  


  uploadImages(img,count){
   
    var rand=Math.random();
    rand=parseInt(rand.toString());
    var image_file_name=(rand*100000000);
    let option: FileUploadOptions = {
      fileKey:'event_photo',
      mimeType:'multipart/form-data', 
      httpMethod:'POST',
      fileName:image_file_name+".png",
      params : {'action':'update_event_photo'}
    };
    const fileTransfer: FileTransferObject = this.transfer.create();
    console.log(img);
    fileTransfer.upload(img,atob("aHR0cDovL2FwcGRkaWN0aW9uc3R1ZGlvLmNvbS9taXhvbG8v")+"attendize/public/api/addEventImage",option).then((result)=>{
      if(result.responseCode==200){
        console.log(result);
        if(count==1)
          localStorage.setItem('event_image_one',result.response);
        if(count==2)
          localStorage.setItem('event_image_two',result.response);
        if(count==3)
          localStorage.setItem('event_image_three',result.response);
        if(count==4)
          localStorage.setItem('event_image_four',result.response);
        if(count==5)
          localStorage.setItem('event_image_five',result.response); 
        
      }
      },function(error)
              {
      
              });
  }

} //Class Ends here

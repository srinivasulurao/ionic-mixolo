import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
import { GuestOfferingPage } from '../guest-offering/guest-offering';
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

  constructor(private alertCtrl:AlertController,private file: File,private imagePicker: ImagePicker, public navCtrl: NavController, public navParams: NavParams) {
    this.image_one="";
    this.image_two="";
    this.image_three="";
    this.image_four="";
    this.image_five="";
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

        // this.file.readAsBinaryString(results[i],results[i]).then(response=>{
        //     if(this.image_one=="" || this.image_one==null)
        //        this.image_one=response;
        //     if(this.image_two=="" || this.image_two==null)
        //        this.image_two=response;
        //     if(this.image_three=="" || this.image_three==null)
        //        this.image_three=response;
        //     if(this.image_four=="" || this.image_four==null)
        //        this.image_four=response;
        //     if(this.image_five=="" || this.image_five==null)
        //        this.image_five=response;
            
        // });
       
      }
    }, (err) => { });

  } //function ends here.


  goNext(){
       if(this.image_one==""){
            let alert = this.alertCtrl.create({
              title: 'Operation Failed',
              subTitle: 'Please select atleast one image !',
              buttons: ['Dismiss']
            });
            alert.present();
       }
       else{
         localStorage.setItem('event_image_one',this.image_one);
         localStorage.setItem('event_image_two',this.image_two);
         localStorage.setItem('event_image_three',this.image_three);
         localStorage.setItem('event_image_four',this.image_four);
         localStorage.setItem('event_image_five',this.image_five);

         this.navCtrl.push(GuestOfferingPage);
       }
  }

} //Class Ends here

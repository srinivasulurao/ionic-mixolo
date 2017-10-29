import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ReviewHostingStandardPage } from '../review-hosting-standard/review-hosting-standard';
/**
 * Generated class for the AdminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'make-personal',
  templateUrl: 'make-personal.html',
})
export class MakePersonalPage {
  public loaderCtrl:any; 
  public AdminName:any;
  public userData:any;
  public cityList:any;
  public interestList:any;

  constructor(public navCtrl: NavController,
    private mixoloWebService:MixoloEventService,
    public alertCtrl: AlertController,
    public loader: LoadingController) {
        this.loadCities();
        this.loadInterest();
        this['where_select']="";
        this['type_select']="";
        
        this.userData=JSON.parse(localStorage.getItem('admin_user_data'));
        this.AdminName=this.userData.name;

        

   }

   loadCities(){
    this.mixoloWebService.getCityList().subscribe(response=>{
        this.cityList=response; 
        console.log(this.cityList);  
      });
   }

   loadInterest(){
    
    this.mixoloWebService.getAllInterests().subscribe(response=>{
        this.interestList=response; 
        console.log(this.interestList);   
      });
   }

   goNext(){
       if(this.validationOk()){
         localStorage.setItem('where',this['where_select']);
         localStorage.setItem('type',this['type_select']);
         this.navCtrl.push(ReviewHostingStandardPage);
       }
   }

   validationOk(){
       var city=this['where_select'];
       var interest=this['type_select'];
       var error="";
       if(city==""){
           error+="<li>Please select where you want to organize the event !</li>";
       }
       if(interest==""){
           error+="<li>Please select type of the event !</li>";
       }

       if(error){
            let alert = this.alertCtrl.create({
                title: 'Operation Failed',
                subTitle: '<ul>'+error+"</ul>",
                buttons: ['Dismiss']
            });
            alert.present();
            return false;
       }
       else{
           return true; //All seems to be good.
       }
   }

  



} // Class ends here.

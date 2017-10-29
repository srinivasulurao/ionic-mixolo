import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MixoloEventService} from '../../app/services/mixolo.events.service';
import { AlertController} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MakePersonalPage} from '../make-personal/make-personal';
/**
 * Generated class for the AdminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'thanks-admin',
  templateUrl: 'thanks-admin.html',
})
export class ThanksAdminPage {
  public loaderCtrl:any; 
  makeItPersonal=MakePersonalPage;
  public AdminName:any;
  public userData:any;

  constructor(public navCtrl: NavController,
    private mixoloEvents:MixoloEventService,
    public alertCtrl: AlertController,
    public loader: LoadingController) {
 
        this.userData=JSON.parse(localStorage.getItem('admin_user_data'));
        this.AdminName=this.userData.name;

   }

  



} // Class ends here.

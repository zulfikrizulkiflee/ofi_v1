import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';

import { UserService } from './../../services/user/user.service';

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userS: UserService,
    private alertCtrl: AlertController,
    private app: App
  ) {}

  viewProfile() {
    this.navCtrl.push('ProfilePage');
  }

  logOut() {
    
    let alert = this.alertCtrl.create({
      title: 'Logout?',
      subTitle: 'Are you sure?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Okay',
          handler: () => {
            this.userS.logOut();
            this.app.getRootNavs()[0].setRoot('LoginPage');
          }
        }
      ]
    });
    alert.present();
  }

}

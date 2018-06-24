import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { UserService } from './../../services/user/user.service';
import { AlertService } from './../../services/component/alert.service';

import { User } from '../../models/user/user.model';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private userS: UserService,
    private alertS: AlertService,
    private alertCtrl: AlertController
  ) {}

  async register(user: User) {
    if (user.password === user.cpassword && user.email != undefined && user.name != undefined && user.password != undefined) {
      let loading = this.loadingCtrl.create({content : "Please wait..."});
      loading.present();
      let alert = this.alertCtrl.create({
        title: 'Register',
        subTitle: 'Confirm register?',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              loading.dismissAll();
            }
          },
          {
            text: 'Okay',
            handler: () => {
              this.userS.register(user)
                .then(data => {
                  this.userS.registerUserDetails(user);
                  this.userS.logOut()
                    .then(() => {
                      loading.dismissAll();
                      this.alertS.show('Registered!', 'Successfully registered');
                      this.navCtrl.setRoot('LoginPage');
                    });
                })
                .catch(error => {
                  loading.dismissAll();
                  this.alertS.show('Error!', error.message);
                })
            }
          }
        ]
      });
      alert.present();
    } else {
      if (user.name == undefined || user.email == undefined || user.password == undefined) {
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Please fill up all fields.',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'Close',
              role: 'cancel'
            },
          ]
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Password missmatch.',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'Close',
              role: 'cancel'
            },
          ]
        });
        alert.present();
      }
    }
    
  }

}

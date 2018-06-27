import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { UserService } from './../../services/user/user.service';
import { User } from '../../models/user/user.model';

import { AlertService } from './../../services/component/alert.service';
import { ToastService } from './../../services/component/toast.service';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user: User;

  uid = this.afAuth.auth.currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userS: UserService, private afAuth: AngularFireAuth, private toast: ToastService, private alertS: AlertService, private alertCtrl: AlertController, public loadingCtrl: LoadingController,) {
  }

  ionViewWillLoad() {
    this.user = this.navParams.get('user');
  }

  saveUser(user: User) {
    let alert = this.alertCtrl.create({
        title: 'Update',
        subTitle: 'Confirm update?',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Okay',
            handler: () => {
              let loading = this.loadingCtrl.create({content : "Please wait..."});
              loading.present();
              this.userS.editUser(user)
                .then(() => {
                  loading.dismissAll();
                  this.toast.show(`Update saved!`);
                  this.navCtrl.pop();
                });
            }
          }
        ]
      });
      alert.present();
  }

}

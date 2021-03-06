import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { CircleService } from './../../services/circle/circle.service';

import { ToastService } from './../../services/component/toast.service';

/**
 * Generated class for the AddCirclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-circle',
  templateUrl: 'add-circle.html',
})
export class AddCirclePage {

  searchUser: string;
  users: Array<any>;
  usersFound: Array<any>;

  message: string;

  email = this.afAuth.auth.currentUser.email;
  public uid = this.afAuth.auth.currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private circleS: CircleService, private afAuth: AngularFireAuth, private toast: ToastService) {
  }

  ionViewDidLoad() {
    this.circleS.getCircleList()
      .subscribe(res => {
          this.users = res;
      });
  }

  onEnterKey() {
    if(this.searchUser != this.email) {
      let loading = this.loadingCtrl.create({content : "Searching..."});
      loading.present();
      this.circleS.searchUser(this.searchUser)
        .subscribe(res => {
          loading.dismissAll();
          this.usersFound = res;

          if(this.usersFound.length == 0) {
            this.message = "No user found";
          } else {
            this.message = "";
            this.users.forEach(a => {
              if((a.payload.val().followee_uid == this.usersFound[0].uid && a.payload.val().follower_uid == this.uid) || (a.payload.val().follower_uid == this.usersFound[0].uid && a.payload.val().followee_uid == this.uid)) {
                this.usersFound[0].isAdded = true;
              }
            });
          }
        });
    }
  }

  onClear(evt) {
    // this.users = [];
  }

  addIntoCircle(user) {
    let loading = this.loadingCtrl.create({content : "Processing..."});
    loading.present();
    let alert = this.alertCtrl.create({
        title: 'Add User',
        subTitle: 'Confirm to add user into your circle?',
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
              this.circleS.addIntoCircle(user)
                .then(function(){
                  loading.dismissAll();
                });
              this.toast.show(user.name + ' added!');
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
  }

}

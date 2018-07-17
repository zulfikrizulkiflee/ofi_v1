import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { CircleService } from './../../services/circle/circle.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private circleS: CircleService, private afAuth: AngularFireAuth) {
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
          
          // this.circleS.checkUserFollower(this.usersFound.uid)
          //   .subscribe(found => {
          //     console.log(found.length);
          //   });
        });
    }
    // 
    // if(this.searchUser != this.email) {
    //   this.circleS.searchUser(this.searchUser)
    //    .subscribe(queriedItems => {
    //       this.users.forEach(function(user) {
    //         if (user.follower_uid == queriedItems[0].uid) {
    //           queriedItems[0].isAdded = true;
    //         } else {
    //           queriedItems[0].isAdded = false;
    //         }
    //       })
    //       this.usersFound = queriedItems;
    //       loading.dismissAll();
    //     });
    // } 
  }

  onClear(evt) {
    // this.users = [];
  }

  addIntoCircle(user) {
    // let loading = this.loadingCtrl.create({content : "Processing..."});
    // loading.present();
    // let alert = this.alertCtrl.create({
    //     title: 'Add User',
    //     subTitle: 'Confirm to add user into your circle?',
    //     enableBackdropDismiss: false,
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         role: 'cancel',
    //         handler: () => {
    //           loading.dismissAll();
    //         }
    //       },
    //       {
    //         text: 'Okay',
    //         handler: () => {
    //           this.circleS.addIntoCircle(user)
    //             .then(function(){
    //               loading.dismissAll();
    //             });
    //           this.navCtrl.pop();
    //         }
    //       }
    //     ]
    //   });
    //   alert.present();
  }

}

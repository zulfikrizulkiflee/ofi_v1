import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CircleService } from './../../services/circle/circle.service';
import { UserService } from './../../services/user/user.service';

import { ToastService } from './../../services/component/toast.service';

/**
 * Generated class for the MyCirclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-circle',
  templateUrl: 'my-circle.html',
})
export class MyCirclePage {

  circleDisplay: boolean = false;

  circleList: Observable<any>;

  userDetails: Observable<any>;

  followerStr: string = "Show only Followers";

  uid = this.afAuth.auth.currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private circleS: CircleService, private userS: UserService, private afAuth: AngularFireAuth, private toast: ToastService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({content : "Loading..."});
    loading.present()
      .then(() => {
        this.circleList = this.circleS.getCircleList()
          .map(changes => {
            return changes.map(c => ({
              key: c.payload.key,
              ...c.payload.val(),
            }));
          });

        this.userDetails = this.userS.getUserDetails()
          .map(changes => {
            return changes.map(c => ({
              key: c.payload.key,
              ...c.payload.val(),
            }));
          })

        loading.dismissAll();
      });
  }

  updateCircleList() {
    if(this.circleDisplay == true) {
      this.followerStr = "Show only Followings";
    } else {
      this.followerStr = "Show only Followers";
    }
  }

  editCircle(type, circle, user_name) {
    this.actionSheetCtrl.create({
      title: user_name,
      buttons: [
        {
          icon: 'close',
          text: type == 'follower' ? 'Remove' : 'Unfollow',
          role: 'destructive',
          // cssClass: 'text-danger',
          handler: () => {
            this.alertCtrl.create({
              title: type == 'follower' ? 'Remove' : 'Unfollow',
              subTitle: type == 'follower' ? 'Confirm remove ' : 'Confirm unfollow ' + user_name + '?',
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
                    this.circleS.removeUser(circle.key)
                      .then(() => {
                        loading.dismissAll();
                        this.toast.show(type == 'follower' ? user_name + ' removed' : 'Unfollowed ' + user_name);
                      });
                  }
                }
              ]
            }).present();
          }
        },
        {
          icon: circle.status == 'Blocked' ? 'eye' : 'eye-off',
          text: circle.status == 'Blocked' ? 'Unblock' : 'Block',
          // cssClass: circle.status == 'Blocked' ? 'text-pass' : 'text-warning',
          handler: () => {
            if (circle.status == 'Blocked') {
              this.circleS.unblockUser(circle.key)
                .then(() => {
                  this.toast.show(user_name + ' Unblocked!');
                });
            } else {
              this.circleS.blockUser(circle.key)
                .then(() => {
                  this.toast.show(user_name + ' Blocked!');
                });
            }
          }
        }
      ]
    }).present();
  }

}

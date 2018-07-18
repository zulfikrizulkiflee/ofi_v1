import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CircleService } from './../../services/circle/circle.service';
import { UserService } from './../../services/user/user.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private circleS: CircleService, private userS: UserService, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    // let loading = this.loadingCtrl.create({content : "Loading..."});
    // loading.present();
    // loading.dismissAll();
    this.circleList = this.circleS.getCircleList()
      .map(changes => {
        let username;
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
      });
  }

  updateCircleList() {
    if(this.circleDisplay == true) {
      this.followerStr = "Show only Followings";
    } else {
      this.followerStr = "Show only Followers";
    }
  }

}

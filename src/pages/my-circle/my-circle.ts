import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

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

  circle: boolean = false;

  circleList: any;

  followerStr: string = "Show only Followers";

  uid = this.afAuth.auth.currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private circleS: CircleService, private userS: UserService, private afAuth: AngularFireAuth) {
  }

  ionViewWillLoad() {
    let loading = this.loadingCtrl.create({content : "Loading..."});
    loading.present();
    this.circleS.getCircleList()
      .subscribe(res => {
        res.forEach(user => {
          if(user.followee_uid == this.uid) {
            this.userS.getSingleUserDetails(user.followee_uid)
              .subscribe(el => {
                res.followee_name = el.name;
              }); 
          } else {
            this.userS.getSingleUserDetails(user.follower_uid)
              .subscribe(el => {
                res.follower_name = el.name;
              });
          }
          
        });
        this.circleList = res;
        // console.log(this.circleList);
        loading.dismissAll();
      });
  }

  updateCircleList() {
    if(this.circle == true) {
      this.followerStr = "Show only Followings";
    } else {
      this.followerStr = "Show only Followers";
    }
  }

}

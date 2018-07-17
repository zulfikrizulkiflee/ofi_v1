import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the OrderInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-info',
  templateUrl: 'order-info.html',
})
export class OrderInfoPage {

  order = this.navParams.get('order');

  uid = this.afAuth.auth.currentUser.uid;

  constructor(
    private navParams: NavParams, 
    private viewCtrl: ViewController,
    private afAuth: AngularFireAuth
    ) {
  }

  // ionViewWillLoad() {
  //   const data = this.navParams.get('data');
  // }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}

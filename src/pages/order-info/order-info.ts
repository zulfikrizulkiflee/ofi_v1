import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

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

  data = this.navParams.get('data');

  constructor(
    private navParams: NavParams, 
    private viewCtrl: ViewController
    ) {}

  // ionViewWillLoad() {
  //   const data = this.navParams.get('data');
  // }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}

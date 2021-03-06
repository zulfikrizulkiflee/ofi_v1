import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { OrderService } from './../../services/order/order.service';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  orderPage:any = 'OrdersPage';
  productPage:any = 'ProductsPage';
  homePage:any = 'HomePage';

  uid = this.afAuth.auth.currentUser.uid;

  orders: Observable<any>;

  count:any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderS: OrderService, private afAuth: AngularFireAuth) {
  }

  ionViewWillLoad() {
    this.count = 0;
    this.orderS.getOrderDetails()
      .subscribe(changes => {
          return changes.map(c => {
            if (c.payload.val().status == "New" && (c.payload.val().to_uid == this.uid || c.payload.val().from_uid == this.uid)) {
              this.count++;
            }
          })
      });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { OrderService } from './../../services/order/order.service';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders: Observable<any>;
  users: Observable<any>;

  uid = this.afAuth.auth.currentUser.uid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private orderS: OrderService,
    private afAuth: AngularFireAuth
    ) {
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({content : "Loading..."});
    loading.present();
    this.orders = this.orderS.getOrderDetails()
      .map(changes => {
        loading.dismissAll();
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  presentOrderModal(order) {
    const modalPage = this.modalCtrl.create('OrderInfoPage', { order: order });
    modalPage.present();
  }

}

import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { OrderService } from './../../services/order/order.service';
import { ProductService } from './../../services/product/product.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productList: Observable<any>;

  orderList: Observable<any>;

  noti_count:any = 0;

  uid = this.afAuth.auth.currentUser.uid;

  miniReport: any = 'today';

  tsales: any = [
    { name: 'FLEUR', value: '123', width: 35 },
    { name: 'OLFactory', value: '3', width: 20 }
  ];

  torders: any = [
    { name: 'FLEUR', value: '20', width: 35 },
    { name: 'OLFactory', value: '5', width: 20 }
  ];

  tcompletes: any = [
    { name: 'FLEUR', value: '20', width: 35 },
    { name: 'OLFactory', value: '5', width: 20 }
  ];

  constructor(public navCtrl: NavController, private orderS: OrderService, private afAuth: AngularFireAuth, private productS: ProductService, private loadingCtrl: LoadingController) {
    
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({content : "Loading..."});
    loading.present()
      .then(() => {
        this.productList = this.productS.getProductDetails()
          .map(products => {
            return products.filter(p => {
              if(p.payload.val().uid == this.uid) {
                return p.payload.val().uid == this.uid;
              } 
            });
          });

        this.productList = this.productList
          .map(products => {
            return products.map(p => {
              if (p.payload.val().uid == this.uid) {
                return {key: p.payload.key,...p.payload.val()}
              }
            })
          });

        this.orderS.getOrderDetails()
          .map(changes => {
            return changes.map(c => {
              console.log(c.payload.val().to_uid);
              if (c.payload.val().to_uid == this.uid) {
                return {key:c.payload.key,...c.payload.val()}
              }
            })
          });

        loading.dismissAll();
    });
  }

  openNotification() {
  	this.navCtrl.push('NotificationsPage');
  }

  openOption() {
  	this.navCtrl.push('OptionsPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}

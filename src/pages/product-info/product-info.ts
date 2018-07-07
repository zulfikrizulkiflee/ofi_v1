import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product } from '../../models/product/product.model';

import { UserService } from './../../services/user/user.service';
import { OrderService } from './../../services/order/order.service';

import { AlertService } from './../../services/component/alert.service';

/**
 * Generated class for the ProductInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html',
})
export class ProductInfoPage {
  product: Product;

  user: Observable<any>;

  uid = this.afAuth.auth.currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userS: UserService, private afAuth: AngularFireAuth, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private orderS: OrderService, private alertS: AlertService) {
  }

  ionViewWillLoad() {
    this.product = this.navParams.get('product');

    this.user = this.userS.getUserDetails()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  singleOrderModal() {
    let alert = this.alertCtrl.create({
      title: this.product.name,
      subTitle: 'Insert quantity',
      inputs: [
        {
          type: 'number',
          name: 'quantity',
          placeholder: 'Quantity'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Order',
          handler: data => {
            let loading = this.loadingCtrl.create({content : "Sending order..."});
            loading.present();
            const orderDetails = {
              key: this.product.key,
              total_quantity: data.quantity,
              total_price: data.quantity * this.product.price
            }
            this.orderS.createSingleOrder(orderDetails)
              .then(data => {
                loading.dismissAll();
                this.alertS.show('Success!', 'Order sent');
              })
          }
        }
      ]
    });
    alert.present();
  }

  variantOrderModal() {
    let inputs = [];
    this.product.variant.forEach(function(element, index) {
      let inputEl = {
        type: 'number',
        placeholder: element.name,
        name: 'quantity_' + index
      }
      inputs.push(inputEl);
    });

    let alert = this.alertCtrl.create({
      title: this.product.name,
      subTitle: 'Insert quantity',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Order',
          handler: data => {
            let loading = this.loadingCtrl.create({content : "Sending order..."});
            loading.present();
            let totalPrice = 0;
            let totalQuantity = 0;
            let variantOrder = [];
            this.product.variant.forEach(function(element, index) {
              totalPrice += (element.price * data['quantity_' + index]);
              totalQuantity += parseInt(data['quantity_' + index]);

              if (data['quantity_' + index] != 0 || data['quantity_' + index] != "") {
                variantOrder.push({
                  name: element.name,
                  quantity: data['quantity_' + index],
                  price: data['quantity_' + index] * element.price
                });
              }
            });

            const orderDetails = {
              key: this.product.key,
              total_quantity: totalQuantity,
              total_price: totalPrice,
              variant_order: variantOrder
            }
            this.orderS.createVariantOrder(orderDetails)
              .then(data => {
                loading.dismissAll();
                this.alertS.show('Success!', 'Order sent');
              })
          }
        }
      ]
    });
    alert.present();
  }

}

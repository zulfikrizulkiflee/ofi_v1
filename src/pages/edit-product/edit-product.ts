import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { ProductService } from './../../services/product/product.service';

import { Product } from '../../models/product/product.model';
import { Variant } from '../../models/product/product.model';

import { AlertService } from './../../services/component/alert.service';
import { ToastService } from './../../services/component/toast.service';

/**
 * Generated class for the EditProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  product = {} as Product;

  variant = {} as Variant;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productS: ProductService, private afAuth: AngularFireAuth, private toast: ToastService, private alertS: AlertService, private alertCtrl: AlertController, public loadingCtrl: LoadingController,) {
  }

  ionViewWillEnter() {
    this.variant = this.navParams.get('variant')|| null;
    if (this.variant != null) {
      this.product.variant.push(this.variant);
    }
  } 

  ionViewWillLoad() {
    this.product = this.navParams.get('product');
  }

  saveProduct(product: Product) {
    let alert = this.alertCtrl.create({
        title: 'Update',
        subTitle: 'Confirm update?',
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
              this.productS.editProduct(product)
                .then(() => {
                  loading.dismissAll();
                  this.toast.show(`Update saved!`);
                  this.navCtrl.pop();
                });
            }
          }
        ]
      });
      alert.present();
  }

  deleteProduct(product: Product) {
    let alert = this.alertCtrl.create({
        title: 'Delete',
        subTitle: 'Confirm delete?',
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
              this.productS.removeProduct(product)
                .then(() => {
                  loading.dismissAll();
                  this.toast.show(product.name + ` deleted!`);
                  this.navCtrl.setRoot("ProductsPage");
                });
            }
          }
        ]
      });
      alert.present();
  }

  removeVariant(index) {
    let alert = this.alertCtrl.create({
        title: 'Remove Variant',
        subTitle: 'Confirm to remove variant?',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Okay',
            handler: () => {
              this.product.variant.splice(index, 1);
            }
          }
        ]
      });
      alert.present();
  }

}

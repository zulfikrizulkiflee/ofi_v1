import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { ProductService } from './../../services/product/product.service';
import { AlertService } from './../../services/component/alert.service';

import { Product } from '../../models/product/product.model';
import { Variant } from '../../models/product/product.model';


/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product = {} as Product;
  variant = {} as Variant;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private productS: ProductService,
    private alertS: AlertService,
    private alertCtrl: AlertController
  ) {}

  async create(product: Product) {
    if (product.name != undefined && product.price != undefined) {
      let loading = this.loadingCtrl.create({content : "Please wait..."});
      loading.present();
      let alert = this.alertCtrl.create({
        title: 'Create Product',
        subTitle: 'Confirm to create product?',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              loading.dismissAll();
            }
          },
          {
            text: 'Okay',
            handler: () => {
              this.productS.create(product)
                .then(data => {
                  loading.dismissAll();
                  this.alertS.show('Success!', 'Successfully created product');
                  this.navCtrl.pop();
                })
                // .catch(error => {
                //   loading.dismissAll();
                //   this.alertS.show('Error!', error.message);
                // })
            }
          }
        ]
      });
      alert.present();
    } else if (product.name == undefined || product.price == undefined) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Please fill up all fields.',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Close',
            role: 'cancel'
          },
        ]
      });
      alert.present();
    }
    
  }

}

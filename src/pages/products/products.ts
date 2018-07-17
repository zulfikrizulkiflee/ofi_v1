import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProductService } from './../../services/product/product.service';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  // products: any = [
  //   { id: 1, brand: 'FLEUR', variant: ['Orly Orange', 'Lavender'] },
  //   { id: 2, brand: 'OLFactory', variant: ['asda'] }
  // ];

  products: Observable<any>;

  uid = this.afAuth.auth.currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private productS: ProductService, public modalCtrl: ModalController, private loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({content : "Loading..."});
    loading.present();
    this.products = this.productS.getProductDetails()
      .map(changes => {
        loading.dismissAll();
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

}

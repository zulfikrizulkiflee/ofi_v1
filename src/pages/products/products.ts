import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProductService } from './../../services/product/product.service';
import { CircleService } from './../../services/circle/circle.service';

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
  products: Observable<any>;
  circles: any;

  uid = this.afAuth.auth.currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private afAuth: AngularFireAuth, private productS: ProductService, public modalCtrl: ModalController, private loadingCtrl: LoadingController, private circleS: CircleService) {
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({content : "Loading..."});
    loading.present()
      .then(() => {
        this.circles = [];
        this.circleS.checkUserFollowee(this.uid)
          .subscribe(circles => {
            circles.map(c => {
              if(c.follower_uid == this.uid && c.status == "Active") {
                this.circles.push(c.followee_uid);
              }
            })
          });

        this.products = this.productS.getProductDetails()
          .map(products => {
            return products.filter(p => {
              if(p.payload.val().uid == this.uid) {
                return p.payload.val().uid == this.uid;
              } else if(this.circles.indexOf(p.payload.val().uid) >= 0) {
                return p.payload.val().uid == this.circles[this.circles.indexOf(p.payload.val().uid)];
              }   
            });
          });

        this.products = this.products
          .map(products => {
            return products.map(p => {
              return {key: p.payload.key,...p.payload.val()}
            })
          });

        loading.dismissAll();
      });
  }
}

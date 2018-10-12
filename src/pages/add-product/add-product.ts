import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';

import { ProductService } from './../../services/product/product.service';
import { AlertService } from './../../services/component/alert.service';
import { UserService } from './../../services/user/user.service';

import { Product } from '../../models/product/product.model';
import { Variant } from '../../models/product/product.model';

import { Camera } from 'ionic-native';


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

  users: Observable<any>;

  uid = this.afAuth.auth.currentUser.uid;

  product = {} as Product;
  variant = {} as Variant;
  variantArr = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private productS: ProductService,
    private alertS: AlertService,
    private alertCtrl: AlertController,
    private userS: UserService,
    private afAuth: AngularFireAuth
  ) {
    this.users = this.userS.getUserDetails()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  ionViewWillEnter() {
    this.variant = this.navParams.get('variant')|| null;
    if (this.variant != null) {
      this.variantArr.push(this.variant);
    }
  } 

  takePhoto(){
    Camera.getPicture({
      quality : 95,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.notePicture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhoto(): void {
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  async create(product: Product, username) {
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
              if (this.variantArr.length > 0) {
                product.variant = this.variantArr;
              } else {
                product.variant = '';
              }

              product.owner_name = username;

              // product.owner_name = user.name;
              // console.log(user.name);
              
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
              this.variantArr.splice(index, 1);
            }
          }
        ]
      });
      alert.present();
  }

}

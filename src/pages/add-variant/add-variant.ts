import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Variant } from '../../models/product/product.model';

/**
 * Generated class for the AddVariantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-variant',
  templateUrl: 'add-variant.html',
})
export class AddVariantPage {
  variant = {} as Variant;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addVariant(variant: Variant) {
    this.navCtrl.getPrevious().data.variant = variant;
    this.navCtrl.pop();
  }
}

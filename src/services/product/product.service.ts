import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Product } from './../../models/product/product.model';

@Injectable()
export class ProductService {

  product = {} as Product;

  private productDetailsRef = this.db.list('products');

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    
  }

  create(product: Product) {
    const productDetails = {
      uid: this.afAuth.auth.currentUser.uid,
      name: product.name,
      owner_name: product.owner_name,
      variant: product.variant,
      price: product.price,
      description: product.description,
      date: new Date().toISOString()
    };

    return this.productDetailsRef.push(productDetails);
  }

  removeProduct(product: Product) {
    // console.log(product);
    return this.productDetailsRef.remove(product.key);
  }

  getProductDetails() {
    return this.productDetailsRef.valueChanges();
  }

  getUserProducts(user_uid) {
    return this.db.list('products', ref => ref.orderByChild('uid').equalTo(user_uid)).valueChanges();
  }

  editProduct(product: Product) {
    return this.productDetailsRef.update(product.key, product);
  }
}
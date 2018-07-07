import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Order } from './../../models/order/order.model';

@Injectable()
export class OrderService {

  order = {} as Order;

  private orderDetailsRef = this.db.list('orders');

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    
  }

  createSingleOrder(order) {
    const orderDetails = {
      uid: this.afAuth.auth.currentUser.uid,
      key: order.key,
      total_quantity: order.total_quantity,
      total_price: order.total_price,
      date: new Date().toISOString(),
      status: 'New'
    };

    return this.orderDetailsRef.push(orderDetails);
  }

  createVariantOrder(order) {
    const orderDetails = {
      uid: this.afAuth.auth.currentUser.uid,
      key: order.key,
      total_quantity: order.total_quantity,
      total_price: order.total_price,
      variant: order.variant_order,
      date: new Date().toISOString(),
      status: 'New'
    };

    return this.orderDetailsRef.push(orderDetails);
  }

  getOrderDetails() {
    return this.orderDetailsRef.snapshotChanges();
  }

  editOrder(order: Order) {
    return this.orderDetailsRef.update(order.key, order);
  }
}
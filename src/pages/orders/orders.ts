import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orders: any = [
    { id: 1, name: 'Ahmad', brand: 'FLEUR', product: 'Car Perfume', quantity: 3,amount: 'RM 123', time: '8 Nov, 9:09 AM', status: 'new' },
    { id: 2, name: 'Kimi', brand: 'OLFactory', product: 'Men Perfume', quantity: 5,amount: 'RM 123', time: '8 Nov, 9:15 AM', status: 'processed' }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController
    ) {}

  presentOrderModal(index) {
    const modalPage = this.modalCtrl.create('OrderInfoPage', { data: this.orders[index] });
    modalPage.present();
  }

}

import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  miniReport: any = 'today';

  sales: any = [
    { name: 'FLEUR', value: '123', width: 35 },
    { name: 'OLFactory', value: '3', width: 20 }
  ];

  orders: any = [
    { name: 'FLEUR', value: '20', width: 35 },
    { name: 'OLFactory', value: '5', width: 20 }
  ];

  completes: any = [
    { name: 'FLEUR', value: '20', width: 35 },
    { name: 'OLFactory', value: '5', width: 20 }
  ];

  constructor(public navCtrl: NavController) {
    
  }

  openNotification() {
  	this.navCtrl.push('NotificationsPage');
  }

  openOption() {
  	this.navCtrl.push('OptionsPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}

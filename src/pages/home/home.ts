import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  miniReport: any = 'today';

  tsales: any = [
    { name: 'FLEUR', value: '123', width: 35 },
    { name: 'OLFactory', value: '3', width: 20 }
  ];

  torders: any = [
    { name: 'FLEUR', value: '20', width: 35 },
    { name: 'OLFactory', value: '5', width: 20 }
  ];

  tcompletes: any = [
    { name: 'FLEUR', value: '20', width: 35 },
    { name: 'OLFactory', value: '5', width: 20 }
  ];

  //============================================

  wsales: any = [
    { name: 'FLEUR', value: '123', width: 35 },
    { name: 'OLFactory', value: '3', width: 20 }
  ];

  worders: any = [
    { name: 'FLEUR', value: '20', width: 35 },
    { name: 'OLFactory', value: '5', width: 20 }
  ];

  wcompletes: any = [
    { name: 'FLEUR', value: '20', width: 35 },
    { name: 'OLFactory', value: '5', width: 20 }
  ];

  //============================================

  msales: any = [
    { name: 'FLEUR', value: '123', width: 35 },
    { name: 'OLFactory', value: '3', width: 20 }
  ];

  morders: any = [
    { name: 'FLEUR', value: '20', width: 35 },
    { name: 'OLFactory', value: '5', width: 20 }
  ];

  mcompletes: any = [
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

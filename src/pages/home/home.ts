import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  miniReport: any = 'today';

  constructor(public navCtrl: NavController) {

  }

  openNotification() {
  	this.navCtrl.push('NotificationsPage');
  }

  openOption() {
  	this.navCtrl.push('OptionsPage');
  }

}

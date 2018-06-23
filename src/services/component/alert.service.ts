import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertService {
  constructor(private alertCtrl:AlertController) {}

  show(title: string, subTitle: string) {
    return this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['Okay']
    }).present();
  }

  showConfirm(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title,
      subTitle,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Okay',
          handler: () => {
            return true;
          }
        }
      ]
    });
    alert.present();
  }
}
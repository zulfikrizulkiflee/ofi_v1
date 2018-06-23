import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App } from 'ionic-angular';

import { UserService } from './../../services/user/user.service';
import { AlertService } from './../../services/component/alert.service';

import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../../models/user/user.model';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController, 
    private userS: UserService,
    private alertS: AlertService,
    private afAuth: AngularFireAuth,
    private app: App
  ) {}

  async login(user: User) {
    let loading = this.loadingCtrl.create({content : "Loging in..."});
    loading.present();
    this.userS.login(user)
      .then(data => {
        loading.dismissAll();
        this.app.getRootNavs()[0].setRoot('TabsPage');
      })
      .catch(error => {
        loading.dismissAll();
        this.alertS.show('Error!', error.message);
      })
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  ionViewDidLoad() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user)
      {
        this.app.getRootNavs()[0].setRoot('TabsPage');
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../models/user/user.model';

@Injectable()
export class UserService {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth) {
    
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  register(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
}
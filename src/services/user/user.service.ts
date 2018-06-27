import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from './../../models/user/user.model';

@Injectable()
export class UserService {

  user = {} as User;

  private userDetailsRef = this.db.list('user-details');

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    
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

  registerUserDetails(user: User) {
    const userDetails = {
      uid: this.afAuth.auth.currentUser.uid,
      name: user.name,
      email: user.email
    };

    return this.userDetailsRef.push(userDetails);
  }

  getUserDetails() {
    return this.userDetailsRef.snapshotChanges();
  }

  editUser(user: User) {
    return this.userDetailsRef.update(user.key, user);
  }
}
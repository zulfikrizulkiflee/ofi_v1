import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from './../../models/user/user.model';

@Injectable()
export class CircleService {

  user = {} as User;

  private circleDetailsRef = this.db.list('circle');

  uid = this.afAuth.auth.currentUser.uid;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    
  }

  addIntoCircle(user: User) {
    const circleDetails = {
      followee_uid: this.uid,
      followee_name: user.name,
      follower_uid: user.uid,
      follower_name: user.name,
      status: 'New'
    };

    return this.circleDetailsRef.push(circleDetails);
  }

  getCircleList() {
    return this.circleDetailsRef.valueChanges();
  }

  searchUser(email) {
    return this.db.list('user-details', ref => ref.orderByChild('email').equalTo(email)).valueChanges();
  }

  editUser(user: User) {
    return this.circleDetailsRef.update(user.key, user);
  }
}
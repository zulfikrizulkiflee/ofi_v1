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
      follower_uid: user.follower_uid,
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

  checkUserFollower(uid) {
    return this.db.list('circle', ref => ref.orderByChild('followee_uid').equalTo(uid)).valueChanges();
  }

  checkUserFollowee(uid) {
    return this.db.list('circle', ref => ref.orderByChild('follower_uid').equalTo(uid)).valueChanges();
  }

  editUser(user: User) {
    return this.circleDetailsRef.update(user.key, user);
  }
}
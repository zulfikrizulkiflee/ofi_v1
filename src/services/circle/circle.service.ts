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
      follower_uid: user.uid,
      status: 'New'
    };

    return this.circleDetailsRef.push(circleDetails);
  }

  getCircleList() {
    return this.circleDetailsRef.snapshotChanges();
  }

  searchUser(email) {
    return this.db.list('user-details', ref => ref.orderByChild('email').equalTo(email)).valueChanges();
  }

  getSingleUser(user_uid) {
    return this.db.list('user-details', ref => ref.orderByChild('uid').equalTo(user_uid)).valueChanges();
  }

  checkUserFollower(uid) {
    return this.db.list('circle', ref => ref.orderByChild('followee_uid').equalTo(uid)).valueChanges();
  }

  checkUserFollowee(uid) {
    return this.db.list('circle', ref => ref.orderByChild('follower_uid').equalTo(uid)).valueChanges();
  }

  blockUser(circle_key) {
    return this.circleDetailsRef.update(circle_key, {status: "Blocked"});
  }

  unblockUser(circle_key) {
    return this.circleDetailsRef.update(circle_key, {status: "Active"});
  }

  removeUser(circle_key) {
    return this.circleDetailsRef.remove(circle_key);
  }
}
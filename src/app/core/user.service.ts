import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { CommonService } from "../shared/services/common.service";
import { map } from 'rxjs/operators';


@Injectable()
export class UserService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private commonService: CommonService
  ) {
  }


  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  updateProfile(data) {
    return this.commonService.post(`customer/EditProfile`, data).pipe(map((res) => {
      if (res) {
        let info = JSON.parse(localStorage.getItem('userInfo'));
        info = { ...info, ...res };
        localStorage.setItem('userInfo', JSON.stringify(info));
      }

      return res;
    }));
  }

  updateProfilePic(data) {
    return this.commonService.post('customer/updateProfilePic', data);
  }

  subscribeUser(email) {
    return this.commonService.post(`marketoo-info/subscribe/${email}`, {});
  }
  unsubscribeUser(email) {
    return this.commonService.post(`marketoo-info/unsubscribe/${email}`, {});
  }

  changePassword(data) {
    return this.commonService.post(`customer/change-password`, data)
  }


}

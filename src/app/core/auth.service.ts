import { EventEmitter, Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { CommonService } from "../shared/services/common.service";

@Injectable()
export class AuthService {

  public openLoginModal: EventEmitter<any> = new EventEmitter(false);
  public isLoggedOut: EventEmitter<any> = new EventEmitter(false);
  constructor(
    public afAuth: AngularFireAuth,
    private commonService: CommonService
  ) { }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve('logout');
      }
      else {
        reject();
      }
    });
  }

  checkUserLoggedIn(isOpenModel = true) {
    let token = this.commonService.getAccessToken()
    if (token) {
      this.openLoginModal.next(false);
      return true;
    } else {
      this.openLoginModal.next(isOpenModel);
      return false;
    }
  }


  login(data) {
    return this.commonService.post('customer/login', data);
  }
  signUp(data) {
    return this.commonService.post('customer/signUp', data);
  }

  refreshToken(data) {
    return this.commonService.post('token/refresh', data)
      .pipe(
        map(res => {
          console.log("auth service--", res)
          this.commonService.isLoading.next(false);
          this.commonService.writeToLS('accessToken', res['accessToken']);
          this.commonService.writeToLS('refreshToken', res['refreshToken']);
        })
      );
  }

  logout() {
    return this.commonService.post('token/revoke', {});
  }


}

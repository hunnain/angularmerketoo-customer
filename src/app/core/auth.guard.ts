import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mapTo';

import { AuthService } from './auth.service';
import { UserService } from '../core/user.service';
import { CommonService } from '../shared/services/common.service';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public userService: UserService,
    private cs: CommonService,
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('auth guard');
    let accessToken = this.cs.getAccessToken();
    let refreshToken = this.cs.getRefreshToken();
    if (refreshToken && accessToken) {
      let data = { accessToken, refreshToken };
      return this.auth
        .refreshToken(data)
        .mapTo(true)
        .catch((err) => {
          console.log(err);
          this.cs.isLoading.next(false);
          localStorage.clear();
          this.auth.isLoggedOut.emit(true);
          this.router.navigate(['home/fashion']);
          return Observable.of(false);
        });
    } else {
      this.router.navigate(['home/fashion']);
      return false;
    }
    // return true;
  }
}

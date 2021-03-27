import { Component, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { SignalrService } from './shared/services/signalr.service';
import { PushNotificationService } from './shared/services/pushNotification.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService, translate: TranslateService,
    private srService: SignalrService,
    private pnService: PushNotificationService,
    private authService: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'zh-Hant']);
    }
  }

  ngOnInit() {
    this.createConnection();
    // this.pnService.init();
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    this.pnService.init();
    setTimeout(() => {
      let isLoggedIn = this.authService.checkUserLoggedIn(false);
      console.log('💻', 'isLoggedIn', isLoggedIn, this.pnService.pushNotificationStatus.isSubscribed);
      if (isLoggedIn && !this.pnService.pushNotificationStatus.isSubscribed) {
        this.getSubscribe();
      } else {
        // this.getUnSubscribe()
      }
    }, 1000)
    // else {
    //   this.menu = true;
    // }
  }

  createConnection() {
    this.srService.connectNotificationHub();
  }

  getSubscribe() {
    // this.pnService.toggleSubscription()
    this.pnService.subscribeUser();
  }
  getUnSubscribe() {
    // this.pnService.toggleSubscription()
    this.pnService.unsubscribeUser();
  }


}

import { Component, OnInit, PLATFORM_ID, Input, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class 
  @Input() themeLogo: string = 'assets/Marketoo.png' // Default Logo
  @Input() newsletter: boolean = true; // Default True

  public today: number = Date.now();
  public lan: boolean;
  public email: string = "";
  public loading: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.lan = true;
  }
  changelan() {
    if (this.lan == false) {
      this.lan = true;
    } else {
      this.lan = false
    }
  }
  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  subscribe() {
    this.loading = true;
    this.userService.subscribeUser(this.email).subscribe(res => {
      // if (res) {
      console.log("subscribe success", res);
      this.email = "";
      this.loading = false;
      // }
    })
  }
}

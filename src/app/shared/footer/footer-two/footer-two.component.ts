import { Component, OnInit,PLATFORM_ID, Input,Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-footer-two',
  templateUrl: './footer-two.component.html',
  styleUrls: ['./footer-two.component.scss']
})
export class FooterTwoComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class 
  @Input() themeLogo: string = 'assets/Marketoo.png' // Default Logo
  @Input() newsletter: boolean = true; // Default True
  
  public today: number = Date.now();
  public lan: boolean;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private translate: TranslateService) {
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
}



import { Component, OnInit, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tap-to-top',
  templateUrl: './tap-to-top.component.html',
  styleUrls: ['./tap-to-top.component.scss']
})
export class TapToTopComponent implements OnInit {

  public show: boolean = false;

  private modalRef: NgbModalRef;
  public giftEnglish: string = 'assets/images/gift-english.jpg';
  public giftChinese: string = 'assets/images/gift-chinese.jpg';
  public lang: string = 'en';
  public showTerms: boolean = false;
  constructor(
    private translateService: TranslateService,
    private viewScroller: ViewportScroller,
    private modalService: NgbModal
  ) {
    this.translateService.currentLang = this.lang;
    this.translateService.onLangChange.subscribe(res => {
      this.lang = res.lang;
    })
  }


  ngOnInit(): void {
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 600) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  tapToTop() {
    this.viewScroller.scrollToPosition([0, 0]);
  }

  openGiftModal(content) {
    console.log("open gift")
    this.modalRef = this.modalService.open(content, { centered: true });
    this.modalRef.result.then(res => console.log(res), (reason) => {
      console.log(reason)

    })
  }

}

import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss']
})
export class HeaderTwoComponent implements OnInit {

  @Input() class: string;
  @Input() themeLogo: string = 'assets/Marketoo.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false

  public stick: boolean = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 300 && window.innerWidth > 400) {
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

}

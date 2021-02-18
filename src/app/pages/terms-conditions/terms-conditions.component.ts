import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/shared/services/about-us.service';
// import { TeamSlider, TestimonialSlider } from '../../shared/data/slider';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  public termsAndConditions: string = null;
  public loading: boolean = false;
  constructor(
    private aboutService: AboutUsService,
    private viewScroller: ViewportScroller
  ) { }


  ngOnInit(): void {
    this.getAboutUs();

  }

  ngAfterViewInit() {
    // console.log('ng after view init', this.viewScroller)
    // this.viewScroller.scrollToPosition([0, 0])
    // this.viewScroller.setOffset([120, 120]);
    // console.log('ng after view init', this.viewScroller.scrollToAnchor("termsAndConditions"))
    this.viewScroller.scrollToAnchor('termsAndConditions'); // Anchore Link
  }

  getAboutUs() {
    this.loading = true;
    this.aboutService.getAboutUs().subscribe(res => {
      this.loading = false;
      if (res && res['body']) {
        if (res['body'].termsAndConditions) {
          this.termsAndConditions = res['body'].termsAndConditions;
          // this.viewScroller.setOffset([0, 0]);
          // this.viewScroller.scrollToAnchor('termsAndConditions'); // Anchore Link
        }
      }
    })
  }
  // public TeamSliderConfig: any = TeamSlider;
  // public TestimonialSliderConfig: any = TestimonialSlider;

  // Testimonial Carousel
  // public testimonial = [{
  //   image: 'assets/images/testimonial/1.jpg',
  //   name: 'Mark jkcno',
  //   designation: 'Designer',
  //   description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  // }, {
  //   image: 'assets/images/testimonial/2.jpg',
  //   name: 'Adegoke Yusuff',
  //   designation: 'Content Writer',
  //   description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  // }, {
  //   image: 'assets/images/testimonial/1.jpg',
  //   name: 'John Shipmen',
  //   designation: 'Lead Developer',
  //   description: 'you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.',
  // }]

  // Team 
  //   public team = [{
  //     image: 'assets/images/team/1.jpg',
  //     name: 'Mark jkcno',
  //     designation: 'Designer'
  //   }, {
  //     image: 'assets/images/team/2.jpg',
  //     name: 'Adegoke Yusuff',
  //     designation: 'Content Writer'
  //   }, {
  //     image: 'assets/images/team/3.jpg',
  //     name: 'John Shipmen',
  //     designation: 'Lead Developer'
  //   }, {
  //     image: 'assets/images/team/4.jpg',
  //     name: 'Hileri Keol',
  //     designation: 'CEO & Founder at Company'
  //   }, {
  //     image: 'assets/images/team/3.jpg',
  //     name: 'John Shipmen',
  //     designation: 'Lead Developer'
  //  }]

}

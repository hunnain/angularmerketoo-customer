import { Component, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/shared/services/about-us.service';
// import { TeamSlider, TestimonialSlider } from '../../shared/data/slider';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  public privacyPolicy: string = null;
  public loading: boolean = false;
  constructor(private aboutService: AboutUsService) { }

  ngOnInit(): void {
    this.getAboutUs();
  }

  getAboutUs() {
    this.loading = true;
    this.aboutService.getAboutUs().subscribe(res => {
      this.loading = false;
      if (res && res['body']) {
        if (res['body'].privacyPolicies) {
          this.privacyPolicy = res['body'].privacyPolicies;
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

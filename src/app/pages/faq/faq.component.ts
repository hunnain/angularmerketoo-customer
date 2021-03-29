import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  public faqs: string = null;
  public loading: boolean = false;
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getAboutUs();
  }

  getAboutUs() {
    this.loading = true;
    this.generalService.getAboutUs().subscribe(res => {
      this.loading = false;
      if (res && res['body']) {
        if (res['body'].faqs) {
          this.faqs = res['body'].faqs;
        }
      }
    })
  }

}

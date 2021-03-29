import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-weekend-marketoo',
  templateUrl: './weekend-marketoo.component.html',
  styleUrls: ['./weekend-marketoo.component.scss']
})
export class WeekendComponent implements OnInit {

  public weekend: string = null;
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
          this.weekend = res['body'].faqs;
        }
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  public campaign = null;
  getCampaign() {
    this.generalService.getCampaignById(1).subscribe(res => {
      if (res && res['body']) {
        this.campaign = res['body']
        console.log(this.campaign);
      }
    })
  }

}

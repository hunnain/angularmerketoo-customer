import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  constructor(
    private generalService: GeneralService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params.subscribe(param => {
      if (param && param.id) {
        this.getCampaign(param.id);
      }
    })
  }

  ngOnInit(): void {
  }

  public campaign = null;
  getCampaign(id) {
    this.generalService.getCampaignById(id).subscribe(res => {
      if (res && res['body']) {
        this.campaign = res['body']
        console.log(this.campaign);
      }
    })
  }

  formatDate(date) {
    return moment(date).format('MMM DD,YY');
  }

}

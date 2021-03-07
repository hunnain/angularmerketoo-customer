import { ViewportScroller } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { GeneralService } from "src/app/shared/services/general.service";

@Component({
  selector: "app-my-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class MyNotificationComponent implements OnInit {

  public notifications = [];
  public loading: boolean = false;

  constructor(
    private generalService: GeneralService,
    private viewScroller: ViewportScroller
  ) {
    this.fetchNotifications()
  }

  ngOnInit(): void { }

  fetchNotifications() {
    this.loading = true;
    this.notifications = [];
    let query = `pageNumber=${this.pageNo}`
    this.generalService.getNotifications(query).subscribe(res => {
      // console.log("notifications", res)
      this.loading = false;
      if (res && res['body']) {
        this.notifications = res['body'];
        let paginate = JSON.parse(res['headers'].get('X-Pagination'));
        this.paginate = paginate;

      }
    })
  }

  formatType(type) {
    let formattedType = type.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
    return formattedType;
  }

  formatTime(date) {
    return moment(date).fromNow();
  }

  getProdNames(prods) {
    return prods.map(item => item.name).join(',');
  }

  getFormatDate(date) {
    return moment(date).format('MMM DD,YY');
  }

  // order Pagination
  public paginate: any = {}; // Pagination use only
  public pageNo: number = 1;
  setPage(page: number) {
    console.log(page);
    this.pageNo = page;
    this.fetchNotifications();
    this.viewScroller.setOffset([120, 120]);
    this.viewScroller.scrollToAnchor('notifyID'); // Anchore Link
  }
}

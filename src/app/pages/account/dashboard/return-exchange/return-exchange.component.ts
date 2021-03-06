import { ViewportScroller } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { ReturnExchangeService } from "src/app/shared/services/return-exchange.service";

@Component({
  selector: "app-return-exchange",
  templateUrl: "./return-exchange.component.html",
  styleUrls: ["./return-exchange.component.scss"],
})
export class ReturnExchangeComponent implements OnInit {
  // imgs = [];
  // refund_reason = ''
  // description = ''
  // solution = "";
  // refund_amount = 0;

  public orders = [];
  public loading: boolean = false;

  constructor(
    private returnService: ReturnExchangeService,
    private viewScroller: ViewportScroller
  ) {
    this.getReturnOrders()
  }

  ngOnInit(): void { }

  getReturnOrders() {
    this.loading = true;
    this.orders = [];
    let query = `pageNumber=${this.pageNo}`
    this.returnService.getAllReturnOrder().subscribe(res => {
      this.loading = false;
      if (res && res['body']) {
        this.orders = res['body'];
        let paginate = JSON.parse(res['headers'].get('X-Pagination'));
        this.paginate = paginate;
      }
    })
  }

  getProdNames(prods) {
    return prods.map(item => item.name).join(',');
  }

  getFormatDate(date) {
    return moment(date).format('MMM DD,YY');
  }

  // readUrl(event: any) {
  //   if (event.target.files.length === 0) return;
  //   //Image upload validation
  //   var mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }
  //   // Image upload
  //   var reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (_event) => {
  //     let img = reader.result.toString();
  //     this.imgs.push(img);
  //   };
  // }

  // order Pagination
  public paginate: any = {}; // Pagination use only
  public pageNo: number = 1;
  setPage(page: number) {
    console.log(page);
    this.pageNo = page;
    this.getReturnOrders();
    this.viewScroller.setOffset([120, 120]);
    this.viewScroller.scrollToAnchor('returnID'); // Anchore Link
  }
}

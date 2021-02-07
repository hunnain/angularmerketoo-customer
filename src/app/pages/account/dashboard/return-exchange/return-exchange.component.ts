import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-return-exchange",
  templateUrl: "./return-exchange.component.html",
  styleUrls: ["./return-exchange.component.scss"],
})
export class ReturnExchangeComponent implements OnInit {
  imgs = [];
  refund_reason = ''
  description = ''
  solution = "";
  refund_amount = 0;
  constructor() { }
  ngOnInit(): void { }

  readUrl(event: any) {
    if (event.target.files.length === 0) return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      let img = reader.result.toString();
      // let base = reader.result.toString();
      console.log(img);
      this.imgs.push(img);
    };
  }
}

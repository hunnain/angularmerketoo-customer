import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit,
  Injectable, PLATFORM_ID, Inject, Output, EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReturnExchangeService } from 'src/app/shared/services/return-exchange.service';

@Component({
  selector: 'app-return-modal',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("return") return: TemplateRef<any>;
  @Input() returnData;
  @Output() reloadData: EventEmitter<any> = new EventEmitter();

  public closeResult: string;
  public loading: boolean = false;
  public returnType: boolean = true;
  public products: any[] = [];

  imgs = [];
  refund_reason = ''
  description = ''
  solution = "";
  refund_amount = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private returnService: ReturnExchangeService
  ) {
    console.log('💻', this.returnData);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

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
      // console.log(img);
      this.imgs.push(img);
    };
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      this.modalService.open(this.return, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
        centered: true,
        windowClass: 'bd-example-modal-md agem'
      }).result.then((result) => {
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  save() {
    // this.loading = true;
    console.log('💻', 'return data', this.products);
    this.reloadData.emit('some data to be pass')
    let data = {
      requestReason: this.refund_reason,
      description: this.description,
      solution: this.solution,
      type: "Refund",
      orderId: this.returnData.orderId
    }

    console.log(this.returnType);

    if (this.imgs.length) {
      data['images'] = this.imgs.map(item => this.removeBase64(item))
    }
    if (!this.returnType && this.products.length) {
      data['ReturnExchangeDetails'] = this.products;
    }

    console.log('💻', 'return data', data);
    // this.returnService.returnOrder(data).subscribe(res => {
    //     this.loading = false; 
    //    if(res){
    //      this.reloadData.emit('some data to be pass');
    //      this.modalService.dismissAll('Close');
    //    }
    //  })
  }

  removeBase64(data) {
    let base = data;
    let splited = base.split('base64,');
    let byteImg = splited[1];
    return byteImg;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
  }

  selectProduct(ev, prod, ind) {
    console.log('ev', ev.target.checked, prod);
    let checked = ev.target.checked;
    console.log('💻', this.returnData);
    if (checked) {
      this.products.push(prod);
    } else {
      this.products.splice(ind, 1)
    }
  }

}

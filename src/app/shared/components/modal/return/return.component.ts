import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit,
  Injectable, PLATFORM_ID, Inject, Output, EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReturnExchangeService } from 'src/app/shared/services/return-exchange.service';
import { CommonService } from 'src/app/shared/services/common.service';

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
    private returnService: ReturnExchangeService,
    private cs: CommonService
  ) {
    this.cs.isLoading.subscribe((loading) => {
      this.loading = loading;
    });
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
        console.log("on close modal")
        this.resetOnClose();
      });
    }
  }

  resetOnClose() {
    this.loading = false;
    this.returnType = true;
    this.products = [];
    this.imgs = [];
    this.refund_reason = ''
    this.description = ''
    this.solution = "";
    this.refund_amount = 0;
  }

  save() {
    this.loading = true;
    this.reloadData.emit('some data to be pass')
    let data = {
      requestReason: this.refund_reason,
      description: this.description,
      solution: this.solution,
      type: "Refund",
      ordrId: this.returnData.orderId
    }


    if (this.imgs.length) {
      data['images'] = this.imgs.map(item => this.removeBase64(item))
    }
    if (!this.returnType && this.products.length) {
      data['ReturnExchangeDetails'] = this.products;
    } else {
      data['ReturnExchangeDetails'] = this.returnData.orderedProductDetails;
    }

    this.returnService.returnOrder(data).subscribe(res => {
      this.loading = false;
      if (res) {
        this.reloadData.emit('some data to be pass');
        this.modalService.dismissAll('Close');
      }
    })
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
    let checked = ev.target.checked;
    if (checked) {
      this.products.push({ ...prod, quantity: 1 });
    } else {
      this.products.splice(ind, 1)
    }
  }

}

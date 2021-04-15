import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit,
  Injectable, PLATFORM_ID, Inject, Output, EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReturnExchangeService } from 'src/app/shared/services/return-exchange.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Product } from 'src/app/shared/classes/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-report-product-modal',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.scss']
})
export class ReportProductComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("report") report: TemplateRef<any>;
  @Output() reloadData: EventEmitter<any> = new EventEmitter();

  public product: Product;
  public closeResult: string;
  public loading: boolean = false;
  public reason = 1;
  public description: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private prodService: ProductService,
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

  openModal(prod) {
    if (prod) {
      this.product = prod;
    }

    if (isPlatformBrowser(this.platformId)) { // For SSR 
      this.modalService.open(this.report, {
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
    this.loading = true;
    let data = {
      reason: this.reason,
      description: this.description
    }

    this.prodService.createReportProduct(this.product.productId, data).subscribe(res => {
      this.loading = false;
      if (res) {
        this.reloadData.emit(true);
        this.modalService.dismissAll('Close');
        this.reason = 1;
        this.description = '';
      }
    })
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


}

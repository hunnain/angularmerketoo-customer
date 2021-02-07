import {
  Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input, AfterViewInit,
  Injectable, PLATFORM_ID, Inject, Output, EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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
    console.log('💻', 'return data');
    this.reloadData.emit('some data to be pass')
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

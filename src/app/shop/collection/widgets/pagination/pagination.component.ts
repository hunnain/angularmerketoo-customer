import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Product } from '../../../../shared/classes/product';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() paginate: any = {};
  @Input() products: Product[] = [];

  @Output() setPage: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(change: SimpleChange) {
    let paginate = change['paginate'];
    let prev = paginate.previousValue;
    let curr = paginate.currentValue
    if (!prev || JSON.stringify(curr) !== JSON.stringify(prev)) {
      this.paginate = curr;
    }
  }


  pageSet(page: number) {
    this.setPage.emit(page);  // Set Page Number  
  }

  makeArray(pagesLength) {
    let pages = Array(pagesLength).fill('').map((x, i) => i + 1);
    return pages;
  }

}

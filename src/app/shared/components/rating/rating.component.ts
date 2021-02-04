import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() type: string = 'star';
  @Input() readonly: boolean = false;
  @Output() rateChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(change: SimpleChange) {
    let ratingChange = change['rating'];
    let rate_prev = ratingChange.previousValue;
    let rate_curr = ratingChange.currentValue;

    if (!rate_prev || rate_curr !== rate_prev) {
      this.rating = rate_curr;
    }
  }

  changeRate(val) {
    console.log(this.rating, val)
    this.rateChange.next(val);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Output() rateChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void { }

  changeRate(val) {
    console.log(this.rating, val)
    this.rateChange.next(val);
  }

}

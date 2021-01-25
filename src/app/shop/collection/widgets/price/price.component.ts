import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  // Using Output EventEmitter
  @Output() priceFilter: EventEmitter<any> = new EventEmitter<any>();

  // define min, max and range
  @Input() min: number = 0;
  @Input() max: number = 0;

  public collapse: boolean = true;

  options: Options = {
    floor: 0,
    ceil: 1000
  };

  price = {
    startPrice: this.min,
    endPrice: this.max
  };

  constructor() {
  }

  ngOnInit(): void { }

  // Range Changed
  appliedFilter(event: any) {
    this.price = { startPrice: event.value, endPrice: event.highValue };
    this.priceFilter.emit(this.price);
  }

  // Save start and end price
  saveFilter() {
    this.price = { startPrice: this.min, endPrice: this.max };
    this.priceFilter.emit(this.price);
  }

}

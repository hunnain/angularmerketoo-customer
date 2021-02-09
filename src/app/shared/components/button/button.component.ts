import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() btnText: string = 'Default';
  @Input() btnType: string = 'button';

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void { }

  handleSubmit() {
    this.onSubmit.next()
  }
}

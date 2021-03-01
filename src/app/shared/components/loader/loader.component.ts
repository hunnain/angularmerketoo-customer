import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() color: string = '#f88379';
  @Input() loading: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}

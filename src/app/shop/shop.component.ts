import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

//...


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(
    public router: Router

  ) { }

  ngOnInit(): void {
  }

}

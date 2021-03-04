import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class ReturnExchangeService {

  constructor(private router: Router, private cs: CommonService) { }

  getAllReturnOrder(query = "") {
    return this.cs.get(`return-exchange/get-return-exchange-by-customer-id?${query}`)
  }

  returnOrder(data) {
    return this.cs.post(`return-exchange/create-return-exchange`, data)
  }

}

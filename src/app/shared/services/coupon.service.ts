import { Injectable } from '@angular/core';
import { CommonService } from './common.service';


@Injectable({
    providedIn: 'root'
})
export class CouponService {

    constructor(private cs: CommonService) { }

    getAllCoupons() {
        return this.cs.get(`customer/get-coupons`)
    }
}

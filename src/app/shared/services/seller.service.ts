import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';


@Injectable({
    providedIn: 'root'
})
export class SellerService {

    constructor(private cs: CommonService) { }

    getSellerById(id) {
        return this.cs.get(`customer/get-seller-profile/${id}`)
    }

    sendMessageToSeller(data: object) {
        return this.cs.post(`chat/send-msg`, data);
    }
    getChatList() {
        return this.cs.get(`chat/get-chat-list`);
    }


    followSeller(id) {
        return this.cs.post(`customer/follow/${id}`, {})
    }

    unfollowSeller(id) {
        return this.cs.put(`customer/unfollow/${id}`, {})
    }
}

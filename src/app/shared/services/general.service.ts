import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(private cs: CommonService) { }

    getAboutUs() {
        return this.cs.get(`common/get-about-us`);
    }

    getRandomCampaign() {
        return this.cs.get(`common/get-random-campaign`);
    }

    getNotifications(query = "") {
        return this.cs.get(`notifications/get-notifications?${query}`);
    }

}

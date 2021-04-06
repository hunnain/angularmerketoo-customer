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

    getBanners() {
        return this.cs.get(`common/get-all-banners`);
    }

    getRandomCampaign() {
        return this.cs.get(`common/get-random-campaign`);
    }

    getCampaignById(id) {
        return this.cs.get(`common/get-campaign-by-id/${id}`);
    }

    getNotifications(query = "") {
        return this.cs.get(`notifications/get-notifications?${query}`);
    }

}

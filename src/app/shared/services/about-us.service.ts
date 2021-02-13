import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private cs: CommonService) { }

  getAboutUs() {
    return this.cs.get(`common/get-about-us`);
  }

}

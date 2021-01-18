import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  // Initialize
  constructor(private cs: CommonService) { }

  // Instagram Array
  public get getInstagramData() {
    return this.cs.externalGet('https://api.instagram.com/v1/users/self/media/recent?access_token=' + environment.instagram_token + '&count=10');
  }

}

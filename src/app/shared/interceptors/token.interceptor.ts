import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../services/common.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private commonService: CommonService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('api.instagram.com')) {
      console.log(request.url.includes('api.instagram.com'))
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.commonService.getAccessToken()}`,
        },
      });
    }

    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { CommonService } from '../services/common.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      //   retry(1),
      catchError((error: HttpErrorResponse) => {
        this.commonService.isLoading.next(false)
        if (error.status === 401) {
          // refresh token
        } else {
          return throwError(error);
        }
      })
    );
  }
}
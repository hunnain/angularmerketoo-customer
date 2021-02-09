import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ErrorRes, Error } from './error';


@Injectable({
  providedIn: 'root'
})
export class CommonErrorService {
  error: Error;
  constructor() { }

  // setError(err: ErrorRes) {
  //   this.error.status = err.status;
  //   this.error.statusText = err.statusText;
  //   const msgData = JSON.parse(err._body);
  //   // this.error.body = msgData.exceptionDetail.innerExceptionMessage;
  //   this.error.body = msgData.Message;
  // }

  getError() {
    return this.error;
  }

  clearError() {
    this.error = new Error();
  }


  // Global Error Service //
  getClientMessage(error: Error): string {
    console.log("client error", error)
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getServerMessage(error: HttpErrorResponse): string {
    console.log("common error service", error);
    let msg = this.parseServerError(error.error)
    return msg ? msg : error.message;
  }

  parseServerError(error) {
    if (error && error.hasOwnProperty('errors')) {
      let { errors } = error;
      let keys = Object.keys(errors);
      return errors[keys[0]][0];
    } else {
      return error.Message;
    }
  }
}

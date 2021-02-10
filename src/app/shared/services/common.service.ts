import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { CommonErrorService } from './error/common-error.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
@Injectable({
    providedIn: 'root',
})
export class CommonService {
    private readonly _http: HttpClient;
    private base_url = environment.base_url;
    private userInfo = JSON.parse(localStorage.getItem('userInfo'));
    private accessToken = localStorage.getItem('accessToken');
    private refreshToken = localStorage.getItem('refreshToken');

    public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);


    constructor(
        // public error: CommonErrorService,
        // public auth: MsalService,
        private http: HttpClient
    ) { }

    public getAccessToken(): string {
        // console.log('tocken', this.accessToken);
        this.accessToken = localStorage.getItem('accessToken');
        if (this.accessToken) return this.accessToken;
        else return '';
    }

    public getRefreshToken(): string {
        this.refreshToken = localStorage.getItem('refreshToken');
        if (this.accessToken) return this.refreshToken;
        else return '';
    }

    httpErrorHandler(error: any) {
        console.log('error handler--', error);
        if (error.status === 403 || error.status === 500 || error.status === 400) {
            // this.error.setError(error);
        } else if (error.status === 401) {
            //   this._auth.signout();
        }
        // return Observable.throw(new Error(error));
        return throwError(new Error(error));
    }

    post(url: string, body: Object): Observable<Response> {
        this.isLoading.next(true)
        // this.error.clearError();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + this.getTocket(),
        });
        return this.http
            .post(this.base_url + url, JSON.stringify(body), { headers: headers })
            .map((response: Response) => {
                return response;
            })
        // .catch((error: any) => this.httpErrorHandler(error));
    }

    put(url: string, body: Object): Observable<Response> {
        this.isLoading.next(true)
        // this.error.clearError();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + this.getTocket(),
        });

        return this.http
            .put(this.base_url + url, JSON.stringify(body), { headers: headers })
            .map((response: Response) => {
                return response;
            })
        // .catch((error: any) => this.httpErrorHandler(error));
    }

    get(url: string): Observable<any> {
        // this.isLoading.next(true)
        // this.error.clearError();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // "X-Pagination": "application/json",
            // "abc": "application/json"
            // 'Authorization': 'Bearer '  + this.auth.acquireTokenRedirect.toString
        });
        // return this.http
        //   .get(this.base_url + url, { headers: headers })
        //   .map((response: any) => {
        //     return response;
        //   });
        return this.http
            .get<any>(this.base_url + url, {
                // headers: new HttpHeaders().set('X-Pagination', ''),
                observe: 'response',
                headers: headers
            })
    }

    externalGet(url: string): Observable<any> {
        this.isLoading.next(true)
        // this.error.clearError();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Methods': '*'
            // "X-Pagination": "application/json",
            // "abc": "application/json"
            // 'Authorization': 'Bearer '  + this.auth.acquireTokenRedirect.toString
        });
        // return this.http
        //   .get(this.base_url + url, { headers: headers })
        //   .map((response: any) => {
        //     return response;
        //   });
        return this.http
            .get<any>(url, {
                // headers: new HttpHeaders().set('X-Pagination', ''),
                observe: 'response',
                headers: headers
            })
    }

    delete(url: string): Observable<Response> {
        this.isLoading.next(true)
        // this.error.clearError();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + this.getTocket(),
        });
        return this.http
            .delete(this.base_url + url, { headers: headers })
            .map((response: Response) => {
                return response;
            })
        // .catch((error: any) => this.httpErrorHandler(error));
    }

    writeToLS(key, value) {
        localStorage.setItem(key, value);
    }
}

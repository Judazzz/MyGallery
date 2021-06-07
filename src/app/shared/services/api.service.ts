import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoggingService } from '@services/logging.service';

import { environment } from '@environments/environment';

@Injectable()
export class ApiService {
    private baseUrl = environment.c_apiBaseUrl;
    private authObj: any;

    constructor(
        private http: HttpClient,
        private logger: LoggingService
    ) {}

    //  Generic Request handler:
    apiCall(endpoint: string, type: string, body: any = null, contentType: string = 'application/json', secure: boolean = true): Observable<Response> {
        this.logger.print('New request of type', type, 'info');
        //
        this.authObj = JSON.parse(localStorage.getItem('auth'));
        //  Determine course of action based on ApiCall type:
        switch (type) {
            case 'DELETE':
                return this.deleteRequest(endpoint, contentType, secure);
            case 'GET':
                return this.getRequest(endpoint, contentType, secure);
            case 'GET_LOCAL':
                return this.getLocalRequest(endpoint, contentType);
            case 'PATCH':
                return this.patchRequest(endpoint, body, contentType, secure);
            case 'POST':
                return this.postRequest(endpoint, body, contentType, secure);
            case 'POST_FILE':
                return this.postFileRequest(endpoint, body);
            case 'PUT':
                return this.putRequest(endpoint, body, contentType, secure);
            default:
                this.logger.print('Undefined request of type', type, 'error');
        }
    }

    /** * Perform a DELETE request */
    deleteRequest(endpoint: string, contentType: string, secure: boolean): Observable<Response> {
        //  Headers:
        let headers = new HttpHeaders();
        if (contentType !== null) {
            headers = headers.append('Content-Type', contentType);
        }
        if (secure) {
            headers = headers.append('Authorization', `Bearer ${this.authObj.token}`);
        }
        headers = headers.append('Accept', 'application/json');
        //
        return this.http.delete(this.baseUrl + endpoint, {headers})
            .pipe(map((response: any) => {
                return response;
            }));
    }

    /** * Perform a GET request */
    getRequest(endpoint: string, contentType: string, secure: boolean): Observable<Response> {
        //  Headers:
        let headers = new HttpHeaders();
        if (contentType !== null) {
            headers = headers.append('Content-Type', contentType);
        }
        if (secure) {
            headers = headers.append('Authorization', `Bearer ${this.authObj.token}`);
        }
        headers = headers.append('Accept', 'application/json');
        //
        return this.http.get(this.baseUrl + endpoint, {headers})
            .pipe(map((response: any) => {
                return response;
            }));
    }

    /** * Perform a Local GET request (fetching data from static JSON file) */
    getLocalRequest(endpoint: string, contentType: string): Observable<Response> {
        //  Headers:
        let headers = new HttpHeaders();
        if (contentType !== null) {
            headers = headers.append('Content-Type', contentType);
        }
        //
        return this.http.get(endpoint, {headers})
            .pipe(map((response: any) => {
                return response;
            }));
    }

    /** * Perform a PATCH request */
    patchRequest(endpoint: string, body: any, contentType: string, secure: boolean): Observable<Response> {
        //  Headers:
        let headers = new HttpHeaders();
        if (contentType !== null) {
            headers = headers.append('Content-Type', contentType);
        }
        if (secure) {
            headers = headers.append('Authorization', `Bearer ${this.authObj.token}`);
        }
        headers = headers.append('Accept', 'application/json');
        //
        return this.http.patch(this.baseUrl + endpoint, body, {headers})
            .pipe(map((response: any) => {
                return response;
            }));
    }

    /** * Perform a POST request */
    postRequest(endpoint: string, body: any, contentType: string, secure: boolean): Observable<Response> {
        //  Headers:
        let headers = new HttpHeaders();
        if (contentType !== null) {
            headers = headers.append('Content-Type', contentType);
        }
        if (secure) {
            headers = headers.append('Authorization', `Bearer ${this.authObj.token}`);
        }
        headers = headers.append('Accept', 'application/json');
        //
        return this.http.post(this.baseUrl + endpoint, body, {headers})
            .pipe(map((response: any) => {
                return response;
            }));
    }

    /** * Perform a POST File request */
    postFileRequest(endpoint: string, body: any): Observable<Response> {
        //  Headers:
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', `Bearer ${this.authObj.token}`);
        headers = headers.append('Accept', 'application/json');
        //
        return this.http.post(this.baseUrl + endpoint, body, {headers})
            .pipe(map((response: any) => {
                return response;
            }));
    }

    /** * Perform a PUT request */
    putRequest(endpoint: string, body: any, contentType: string, secure: boolean): Observable<Response> {
        //  Headers:
        let headers = new HttpHeaders();
        if (contentType !== null) {
            headers = headers.append('Content-Type', contentType);
        }
        if (secure) {
            headers = headers.append('Authorization', `Bearer ${this.authObj.token}`);
        }
        headers = headers.append('Accept', 'application/json');
        //
        return this.http.put(this.baseUrl + endpoint, body, {headers})
            .pipe(map((response: any) => {
                return response;
            }));
    }
}

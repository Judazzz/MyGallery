import { Injectable } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import {ApiService} from '@services/api.service';

@Injectable()
export class GalleryService {
    @Output() incomingMessage: EventEmitter<any> = new EventEmitter();
    activeConversationId: number = null;

    constructor(
        private http: HttpClient,
        private router: Router,
        private apiService: ApiService) {
    }

    //  Get Latest Pages (home):
    getGalleryImages(): Observable<Response> {
        //  Request options:
        let endpoint = 'photos';
        let type = 'GET';
        //  Request:
        return this.apiService.apiCall(endpoint, type, null, 'application/json', false);
    }
}

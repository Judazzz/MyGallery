import { Component } from '@angular/core';
import { OnInit, AfterContentInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'jhw-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {

    constructor() {}

    ngOnInit() {}

    ngAfterContentInit(): void {}

    ngOnDestroy(): void {}

    //  Set specific device info as css class(es) on body element (mobile/tablet-only):
    public setCssClasses() {
    }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    selector: 'jhw-page-header',
    templateUrl: 'page-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageHeaderComponent implements OnInit {

    constructor() {
    }

    // ----  LIFECYCLE:
    ngOnInit(): void {}
}

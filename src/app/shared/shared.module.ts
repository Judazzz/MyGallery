import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageHeaderComponent } from '@components/page-header/page-header.component';
import { PageFooterComponent } from '@components/page-footer/page-footer.component';

import { ApiService } from '@services/api.service';
import { LocalStorageService } from '@services/localstorage.service';
import { LoggingService } from '@services/logging.service';

import { PreventPropagationDirective } from '@directives/prevent-propagation.directive';

import { throwIfAlreadyLoaded } from '@guards/module-import.guard';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        PageHeaderComponent,
        PageFooterComponent,
        PreventPropagationDirective
    ],
    declarations: [
        PageHeaderComponent,
        PageFooterComponent,
        PreventPropagationDirective
    ],
    providers: [
        ApiService,
        LocalStorageService,
        LoggingService
    ],
})

export class SharedModule {
    constructor( @Optional() @SkipSelf() parentModule: SharedModule) {
        throwIfAlreadyLoaded(parentModule, 'SharedModule');
    }
}

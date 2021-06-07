import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { SharedModule } from '../../shared/shared.module';

import { GalleriesComponent } from './galleries/galleries.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryService } from './gallery.service';

import { throwIfAlreadyLoaded } from '@guards/module-import.guard';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // SharedModule
    ],
    exports: [
        GalleriesComponent,
        GalleryComponent
    ],
    declarations: [
        GalleriesComponent,
        GalleryComponent
    ],
    providers: [
        GalleryService
    ],
})

export class GalleryModule {}

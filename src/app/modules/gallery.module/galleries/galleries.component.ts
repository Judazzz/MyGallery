import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { LoggingService } from '@services/logging.service';
import { LocalStorageService } from '@services/localstorage.service';
import { GalleryService } from '../gallery.service';

import { Gallery } from '@models/gallery.model';
import { Image } from '@models/image.model';

@Component({
    selector: 'jh-galleries',
    templateUrl: 'galleries.component.html'
})

export class GalleriesComponent implements OnInit {
    orderActive: boolean;
    selectedOrder = 'date taken';
    sizeActive: boolean;
    selectedSize: string;
    numPerPageActive: boolean;
    selectedNumPerPage: number;
    listOffset: number;

    listItemsHidden: boolean;
    allImages: Image[] = [];
    allGalleryIds: Number[] = [];
    visibleGalleryIds: Number[] = [];
    //
    feedbackClass: string;
    feedbackMessage: string;
    feedbackVisible = false;

    constructor(
        private logger: LoggingService,
        private galleryService: GalleryService
    ) {
        this.orderActive = false;
        this.sizeActive = false;
        this.listItemsHidden = false;
        this.selectedOrder = 'medium';
        this.numPerPageActive = false;
        this.selectedNumPerPage = 10;
        this.listOffset = 0;
    }

    // ----  LIFECYCLE:
    ngOnInit(): void {
        this.selectedOrder = LocalStorageService.getValue('album-order');
        //  (Pre)set sort order:
        if (!this.selectedOrder) {
            this.selectedOrder = 'title';
            LocalStorageService.setValue('album-order', 'title');
        }
        //  (Pre)set item size:
        this.selectedSize = LocalStorageService.getValue('album-size');
        if (!this.selectedSize) {
            this.selectedSize = 'medium';
            LocalStorageService.setValue('album-size', 'medium');
        }
        //  (Pre)set display size:
        this.selectedSize = LocalStorageService.getValue('display-size');
        if (!this.selectedNumPerPage) {
            this.selectedNumPerPage = 10;
            LocalStorageService.setValue('display-size', 10);
        }
        // Get images:
        this.getImages();
    }

    private getImages() {
        let self = this;
        //  Request (since we can't request Albums directly with the available API, we will get all images and derive the Album ID's for the links from the results):
        let galleryObservable = this.galleryService.getGalleryImages();
        galleryObservable
            .subscribe(
            (response) => {
                this.logger.print('Fetch Albums successful', '', 'log');
                let imageObjs = response as any;
                //  Images (all) found?
                if (imageObjs.length === 0) {
                    //  No => Show feedback:
                    this.logger.print('Albums found: 0', '', 'log');
                    
                } else {
                    imageObjs.forEach(function (imageObj) {
                        let image = new Image(imageObj);
                        self.allImages.push(image);
                    });
                    if (this.allImages.length === 0) {
                        //  No => Show feedback:
                        this.logger.print('No albums found', '', 'log');
                    } else {
                        // Get all unique AlbumID's from the Images Collection:
                        // Normally we would query the 'Albums' database table directly:
                        this.visibleGalleryIds = self.allImages.map(x => x.albumId).filter((value, index, self) => self.indexOf(value) === index);
                        this.logger.print('Albums found: ', + this.visibleGalleryIds.length, 'log');
                    }
                }
            },
            (error) => {
                this.logger.print('Fetch albums failed', error, 'error');
                if (error.status) {
                    // Handle error with status...
                } else {
                    // Handle error without status...
                }
            },
            () => {}
        );
    }

    togglePulldown(target: string): void {
        if (target === 'size') {
            this.sizeActive = !this.sizeActive;
        }
        else if (target === 'order') {
            this.orderActive = !this.orderActive;
        }
    }

    changeSize(selected: string): void {
        //  Toggle pulldown:
        this.sizeActive = !this.sizeActive;
        //  Hide items:
        this.listItemsHidden = true;
        //  Items are hidden after short delay (allow css transition to complete):
        setTimeout( () => {
            //  Change item size:
            this.selectedSize = selected;
            LocalStorageService.setValue('album-size', selected);
            //  Show items after short delay (allow order change to complete):
            setTimeout( () => {
                //  Show items:
                this.listItemsHidden = false;
            }, 375);
        }, 250);
    }
}

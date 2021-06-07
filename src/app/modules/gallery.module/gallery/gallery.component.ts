import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';

import { LoggingService } from '@services/logging.service';
import { LocalStorageService } from '@services/localstorage.service';
import { GalleryService } from '../gallery.service';

import { Image } from '@models/image.model';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'jh-gallery',
    templateUrl: 'gallery.component.html'
})

export class GalleryComponent implements OnInit, OnDestroy {
    galleryId: number;
    galleryObservable: Observable<Response>;
    galleryObservableSubscription: Subscription;

    orderActive: boolean;
    selectedOrder = 'date taken';
    sizeActive: boolean;
    selectedSize: string;
    numPerPageActive: boolean;
    selectedNumPerPage: number;
    listOffset: number;

    listItemsHidden: boolean;
    allImages: Image[] = [];
    visibleImages: Image[] = null;

    selectedImage: Image = null;
    selectedImageVisible: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private logger: LoggingService,
        private galleryService: GalleryService
    ) {
        //  Check for urlParameter 'id', so we can load the correct Images:
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.galleryId = parseInt(id) || 1;
    }

    // ----  LIFECYCLE:
    ngOnInit(): void {
        // Set gallery properties:
        this.setGalleryProperties();
        // Get images:
        this.getImages();
    }
    ngOnDestroy(): void {
        this.galleryObservableSubscription.unsubscribe();
    }

    // Set Gallery Properties (Thumbnail size, SortOrder):
    private setGalleryProperties(): void {
        this.selectedOrder = LocalStorageService.getValue('album-order');
        //  (Pre)set sort order:
        if (!this.selectedOrder) {
            this.selectedOrder = 'title';
            LocalStorageService.setValue('album-order', 'title');
        }
        this.orderActive = false;
        //  (Pre)set item size:
        this.selectedSize = LocalStorageService.getValue('album-size');
        if (!this.selectedSize) {
            this.selectedSize = 'medium';
            LocalStorageService.setValue('album-size', 'medium');
        }
        this.sizeActive = false;
        //  (Pre)set display size:
        this.selectedNumPerPage = LocalStorageService.getValue('display-size');
        if (!this.selectedNumPerPage) {
            this.selectedNumPerPage = 50;
            LocalStorageService.setValue('display-size', 50);
        }
    }

    private getImages(): void {
        let self = this;
        //  Request:
        this.galleryObservable = this.galleryService.getGalleryImages();
        this.galleryObservableSubscription = this.galleryObservable
            .subscribe(
            (response) => {
                this.logger.print('Fetch Images successful', '', 'log');
                let imageObjs = response as any;
                //  Images (all) found?
                if (imageObjs.length === 0) {
                    //  No => Show feedback:
                    this.logger.print('No images found', '', 'log');
                    
                } else {
                    //  Yes => Store all Images in Array:
                    imageObjs.forEach(function (imageObj) {
                        if (imageObj.albumId === self.galleryId) {
                            let image = new Image(imageObj);
                            self.allImages.push(image);
                        }
                    });
                    // Images returned?
                    if (this.allImages.length === 0) {
                        //  No => Show feedback:
                        this.logger.print('Images found for album with ID ' + this.galleryId + ': 0' , '', 'log');
                    } else {
                        // Yes => Sort Images (on frond-end, not available through API):
                        this.logger.print('Images found for album with ID ' + this.galleryId + ': ', + this.allImages.length, 'log');
                        // Set order and take amount as per paging setting:
                        // Normally we would include all sorting and paging data in the 'Images' database-query:
                        this.changeOrder(this.selectedOrder, false);
                    }
                }
            },
            (error) => {
                this.logger.print('Fetch images failed', error, 'error');
                if (error.status) {
                    // Handle error with status...
                } else {
                    // Handle error without status...
                }
            },
            () => {}
        );
    }

    // Toggle fullsize Image:
    private toggleFullImage(event: any): void {
        let selectedImageId = parseInt(event.target.id);
        if (this.selectedImageVisible) {
            this.selectedImage = null;
            this.selectedImageVisible = false;
        } else {
            // Using forEach as Array.filter and Array.find are uncooperative for some reason...
            this.visibleImages.forEach((visibleImage) => {
                if (visibleImage.id === selectedImageId) {
                    this.selectedImage = visibleImage;
                }
            });
            this.selectedImageVisible = true;
        }
    }

    // Change sorting (on frond-end, not available through API)::
    changeOrder(selected: string, fromEvent): void {
        //  Toggle pulldown, if from event:
        if (fromEvent) {
            this.orderActive = !this.orderActive;
        }
        //  Hide items:
        this.listItemsHidden = true;
        //  Items are hidden after short delay (allow css transition to complete):
        setTimeout( () => {
            //  Change sort order:
            this.selectedOrder = selected;
            LocalStorageService.setValue('album-order', selected);
            if (this.selectedOrder === 'random') {
                this.allImages.sort(() => 0.5 - Math.random());
            }
            if (this.selectedOrder === 'id') {
                this.allImages.sort((a, b) => a.id - b.id);
            }
            else {
                this.allImages.sort((a, b) => a.title.localeCompare(b.title));
            }
            this.visibleImages = this.allImages.slice(this.listOffset, this.selectedNumPerPage);
            //  Show items after short delay (allow order change to complete):
            setTimeout( () => {
                //  Show items:
                this.listItemsHidden = false;
            }, 375);
        }, 250);
    }

    // Change thumbnail size:
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

    // Toggle Thumbnail size/SortOrder dropdown:
    toggleDropdown(target: string): void {
        if (target === 'size') {
            this.sizeActive = !this.sizeActive;
        }
        else if (target === 'order') {
            this.orderActive = !this.orderActive;
        }
    }
}

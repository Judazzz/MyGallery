import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleriesComponent } from '@module.gallery/galleries/galleries.component';
import { GalleryComponent } from '@module.gallery/gallery/gallery.component';

const routes: Routes = [
    {
        path: 'home',
        component: GalleriesComponent
    },    {
        path: 'galleries',
        redirectTo: 'home'
    },
    // {
    //     path: 'gallery',
    //     redirectTo: 'gallery/1'
    // },
    {
        path: 'gallery/:id',
        component: GalleryComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    },
    {
        path: '',
        loadChildren: './modules/gallery.module/gallery.module#GalleryModule' // () => GalleryModule
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        useHash: true
    })],
    exports: [RouterModule]
})

export class AppRoutingModule {}

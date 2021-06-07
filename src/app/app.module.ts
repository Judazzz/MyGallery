import { HashLocationStrategy, LOCATION_INITIALIZED } from '@angular/common';
import { LocationStrategy } from '@angular/common';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
//  Services:
import { ApiService } from '@services/api.service';
import { LoggingService } from '@services/logging.service';
//  Components:
import { AppComponent } from './app.component';
//  Modules:
import { SharedModule } from './shared/shared.module';
import { GalleryModule } from '@module.gallery/gallery.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        GalleryModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        ApiService,
        LoggingService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
            multi: false
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}

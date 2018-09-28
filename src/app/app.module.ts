import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ServiceProvider} from '../providers/service/service';
import {AuthenticationService} from '../providers/authentication-service/authentication-service';
import {Settings} from "../shared/providers/settings/settings";
import { IonicStorageModule, Storage} from "@ionic/storage";
import { File} from "@ionic-native/file";
import { FilePath } from '@ionic-native/file-path';
import { FabContainer} from "ionic-angular";
import { Brightness} from "@ionic-native/brightness";


export function provideSettings(storage: Storage) {

    let defaultSettings = {};

    return new Settings(storage, defaultSettings);
}


@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ServiceProvider,
        File,
        FilePath,
        FabContainer,
        Brightness,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: Settings, useFactory: provideSettings, deps: [Storage]},

        AuthenticationService

    ]
})
export class AppModule {
}

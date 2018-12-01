import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {Settings} from "../shared/providers/settings/settings";
import {LoginPage} from "../pages/login/login";
import {AuthenticationService} from "../providers/authentication-service/authentication-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public settings: Settings, private auth: AuthenticationService) {

      platform.ready().then(() => {
          if (this.settings.settingsLoaded) {
              this.auth.getUser().then(data => {
                  this.auth.validateAuthToken(data.token)
                      .subscribe(
                          res => this.rootPage = HomePage,
                          err => this.rootPage = LoginPage
                      )
              });

          }

      });
  }

}
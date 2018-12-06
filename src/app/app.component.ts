import {Component, ViewChild} from '@angular/core';
import {FabContainer, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import category from '../pages/home/home.module';
import { HomePage } from "../pages/home/home";
import {Settings} from "../shared/providers/settings/settings";
import {LoginPage} from "../pages/login/login";
import {AuthenticationService} from "../providers/authentication-service/authentication-service";
import {ServiceProvider} from "../providers/service/service";


@Component({
    templateUrl: 'app.html'

})




export class MyApp {

    @ViewChild(Nav) nav: Nav;

    rootPage:any = LoginPage;
    storyFromHome: any = this.service.getCategories();


    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                public settings: Settings,
                public service: ServiceProvider,
                private auth: AuthenticationService) {

      platform.ready().then(() => {

          if (this.settings.settingsLoaded) {

              this.auth.getUser().then(data => {

                  this.auth.validateAuthToken(data.token)
                      .subscribe(
                          res => this.rootPage = HomePage && console.log(res),
                          err => this.rootPage = LoginPage && console.log(err)
                      )
              });

          }
      });

  }

    searchCat(s, fab: FabContainer){
        fab.close();
        this.nav.push(HomePage, {
            searchTerm: s
        });

    }
}
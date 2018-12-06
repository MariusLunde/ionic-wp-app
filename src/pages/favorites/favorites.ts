import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Settings} from "../../shared/providers/settings/settings";
import {HomePage} from "../home/home";

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  public story: Array<any> = new Array<any>();
  public Favs: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public settings: Settings) {
        for (let story in this.settings.getAll()){
            story != 'User' ? this.story.push(story): '';

        }
  }

    postTapped(story: string) {
        console.log(story);
        this.navCtrl.push('SavedPage', {
            story: story
        });
    }

    exit(){
        this.navCtrl.push(HomePage);
    }

}

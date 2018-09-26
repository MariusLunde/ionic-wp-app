import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Settings} from "../../shared/providers/settings/settings";
import {isEmpty} from "rxjs/operators";

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

          this.story = this.settings.getAll();

            if(this.isEmpty(this.settings.getAll())) {
              this.Favs = false;
                console.log(this.settings.getAll());

            }else{
              this.Favs = true;

                console.log(this.settings.getAll());

                this.story = Object.keys(this.story).map(key => this.story[key]);

                for (let key in this.story) {
                    if (this.story[key] == null) {
                        this.story[key] = this.story.pop();
                    }
                }

            }
  }

    postTapped(story : any) {
        this.navCtrl.push('PostPage', {
            story: story
        });

    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}

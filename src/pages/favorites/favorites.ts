import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Settings} from "../../shared/providers/settings/settings";

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

  public story: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public settings: Settings) {

      this.story = this.settings.getAll();



      this.story = Object.keys(this.story).map(key => this.story[key]);

      for(let key in this.story){
          if(this.story[key] == null){
            this.story[key] =  this.story.pop();
          }
      }
      
  }


}

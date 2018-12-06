import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage} from "../home/home";
import {debuglog, log} from "util";


/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

    category: any;
    searchTerm: any;


    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.category = this.navParams.get('cat');

  }

    search(s){
        if (s == 'all') {
            this.searchTerm = 17;
        }else{
            this.searchTerm = s;
        }

        this.searchTerm = s;

        this.navCtrl.push(HomePage, {
          searchTerm: this.searchTerm
        });

    }

}

import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { ServiceProvider} from "../../providers/service/service";
import {Settings} from "../../shared/providers/settings/settings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public story: Array<any> = new Array<any>();
    public category: any;

    morePagesAvailable: boolean = false;

    searchTerm: string;

    categoryId: any;


  constructor(public navCtrl: NavController, public service: ServiceProvider, public settings: Settings, public navParam: NavParams) {
      !this.story == undefined ? this.morePagesAvailable = true : this.morePagesAvailable = false;

      this.category = this.service.getCategories();



      this.categoryId == undefined ? this.searchTerm = this.navParam.get('searchTerm') : false;

      this.search();

  }

  getPosts() {
      this.service.getRecentPosts(this.categoryId).subscribe(data => {
          for(let key in data){
              if(data[key] != this.story[key]) {
                  this.story[key] = data[key];
              }
          }
      });
  }

    postTapped(story : any) {
        this.navCtrl.push('PostPage', {
            story: story
        });
    }


    doInfinite(infiniteScroll) {

        this.service.getRecentPosts(this.categoryId)
            .subscribe(data => {
                if(data) {
                    infiniteScroll.complete();
                    this.getPosts();
                }

            });
    }


    doRefresh(){
        this.service.getRecentPosts(this.categoryId).subscribe(data => {
            this.getPosts();
            this.service.getCategories();
        });
    }

    search() {
          this.category.filter((cat) => {
              if(cat.name.indexOf(this.searchTerm) > -1){
                  this.categoryId = cat.id;
              }
          });
          this.story = new Array<any>();
          this.getPosts();
    }


    toFavorites() {

        this.navCtrl.push('FavoritesPage');
    }

    toCategories() {
        console.log(this.category);

        this.navCtrl.push('CategoriesPage', {
            cat: this.category
        });
    }

}

import {Component, NgZone} from '@angular/core';
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
    image: any;

    morePagesAvailable: boolean = true;


    searchTerm: string;

    categoryId: any;


  constructor(public navCtrl: NavController, public service: ServiceProvider, public settings: Settings, public navParam: NavParams, private zone: NgZone) {
      this.category = this.service.getCategories();

      this.categoryId == undefined ? this.searchTerm = this.navParam.get('searchTerm') : false;

      this.search();


  }

  getPosts() {
      this.service.getRecentPosts(this.categoryId).subscribe(data => {
          for(let key in data){
                  this.story[key] = data[key];
                  console.log(data[key]);
                  this.image = data[key];
                  // console.log(this.image);
          }
      });

      this.service.getRecentPostsImages(this.categoryId).subscribe(data=> {
          for(let key in data){
              console.log(data[key]._embedded['wp:featuredmedia']['0'].source_url);

          }
      });

  }

    postTapped(story : any) {
        this.navCtrl.push('PostPage', {
            story: story
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


    doInfinite(infiniteScroll) {
        let page = Math.ceil(this.story.length / 10) + 1;
        this.service.getRecentPosts(this.categoryId, page).subscribe(data => {
                for(let key in data){
                        this.story.push(data[key]);
                        infiniteScroll.complete();
                }
            }, err => {
            this.morePagesAvailable = false;

            console.log(Object.keys(this.story));
         });
        }


    toFavorites() {

        this.navCtrl.push('FavoritesPage');
    }

    toCategories() {
        this.navCtrl.push('CategoriesPage', {
            cat: this.category
        });
    }

}

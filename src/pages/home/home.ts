import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ServiceProvider} from "../../providers/service/service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public story: Array<any> = new Array<any>();
    public category: any;

    morePagesAvailable: boolean = true;

    searchTerm: string;

    categoryId: any;


  constructor(public navCtrl: NavController, public service: ServiceProvider) {
      !this.story == undefined ? this.morePagesAvailable = true : this.morePagesAvailable = false;
      this.category = this.service.getCategories();
  }

  getPosts(s) {
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
                    this.getPosts(this.searchTerm);
                }

            });
    }

    doRefresh(refresher){
        this.service.getRecentPosts(this.categoryId).subscribe(data => {
            this.getPosts(this.searchTerm);
            this.service.getCategories();
        });
        return refresher.complete();
    }

    search(s) {
      this.searchTerm = s;
      this.category.filter((cat) => {
          if(cat.name.indexOf(this.searchTerm) > -1){
              this.categoryId = cat.id;
          }
      });
      this.story = new Array<any>();
      this.getPosts(this.categoryId);
    }

}

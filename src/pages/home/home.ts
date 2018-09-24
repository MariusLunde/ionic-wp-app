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

    private storiesToLoad: number = 10;
    private i : number;

    searchTerm: string;

    categoryId: any;


  constructor(public navCtrl: NavController, public service: ServiceProvider) {
      !this.story == undefined ? this.morePagesAvailable = true : this.morePagesAvailable = false;
      this.category = this.service.getCategories();
  }

  getPosts(s) {
      this.service.getRecentPosts(s).subscribe(data => {
          for(this.i = 0; this.i <= this.storiesToLoad;this.i++){
              if(!(data[this.i] == undefined)) {
                  this.story[this.i] = data[this.i];
                  console.log(this.story[this.i]);

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
                    for(this.i = 0; this.i <= this.storiesToLoad; this.i++){
                        infiniteScroll.complete();
                        this.story[this.i] = data[this.i];

                    }
                }

            }, err => {
                if(err){
                    return;
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
        this.getPosts(s);
    }

}

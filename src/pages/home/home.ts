import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ServiceProvider} from "../../providers/service/service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public story: Array<any> = new Array<any>();
    morePagesAvailable: boolean = true;


    private i : number;



  constructor(public navCtrl: NavController, public service: ServiceProvider) {
          this.service.getRecentPosts().subscribe(data => {
              for(this.i = 0; this.i >= 0; this.i++){
                  if(!(data[this.i] == undefined)) {
                      this.story[this.i] = data[this.i];
                  }
              }

          });

          !this.story == undefined ? this.morePagesAvailable = true : this.morePagesAvailable = false;
  }

    postTapped(story : any) {
        this.navCtrl.push('PostPage', {
            story: story
        });
    }


    doInfinite(infiniteScroll) {

        this.service.getRecentPosts()
            .subscribe(data => {
                if(data) {
                    for(this.i = 0; this.i >= 0; this.i++){
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

}

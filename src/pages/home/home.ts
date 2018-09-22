import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { ServiceProvider} from "../../providers/service/service";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public story: Array<any> = new Array<any>();


    private i : number;

    public storiesToLoad: number = 10;


    public story_bit: Array<any>;
    public story_title : Array<any>;
    public story_content: Array<any>;

  constructor(public navCtrl: NavController, public service: ServiceProvider, public loadingCtrl: LoadingController) {
          this.service.getRecentPosts().subscribe(data => {
              for(this.i = 0; this.i < this.storiesToLoad; this.i++){
                  if(!(data[this.i] == undefined)) {
                      this.story[this.i] = data[this.i];
                  }
                  console.log(data[this.i]);
              }

          });
  }

  //
  // getTitle() {
  //     this.service.getRecentPosts().subscribe(story => {
  //         for(let key in story){
  //             this.story_title = story[key].title.rendered;
  //         }
  //         return this.story_title;
  //
  //     });
  // }
  //
  //   getContent() {
  //       this.service.getRecentPosts().subscribe(story => {
  //           for(let key in story){
  //               this.story_content = story[key].content.rendered;
  //           }
  //           return this.story_content;
  //
  //       });
  //   }
  //
  //   getBit(){
  //       this.service.getRecentPosts().subscribe(story => {
  //           for(let key in story){
  //               this.story_bit = story[key].excerpt.rendered;
  //           }
  //           return this.story_bit;
  //
  //       });
  //   }

    postTapped(story : any) {
        this.navCtrl.push('PostPage', {
            story: story
        });
    }


}

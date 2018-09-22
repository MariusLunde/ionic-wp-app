import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

    story: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.story = this.navParams.get('story');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Settings} from "../../shared/providers/settings/settings";

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

    story: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public settings: Settings) {
        this.story = this.navParams.get('story');

        console.log(this.settings.getAll());

  }

  save(content: any) {
          if (content != this.settings.get('story')) {
              this.settings.set(content.title.rendered, content);
          }

  }
  goBack() {
        this.navCtrl.pop();
  }

}

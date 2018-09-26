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
    saved: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public settings: Settings) {
        this.story = this.navParams.get('story');


        this.settings.get(this.story.title.rendered) ? this.saved = true : this.saved = false;

        console.log(this.settings.getAll());

  }

  save(content: any) {

      if (content != this.settings.get('story')) {
          this.settings.set(content.title.rendered, content);
          this.saved = true;
          console.log(this.settings.getAll());

      }

  }

  delete(content: any) {

      this.settings.delete(content.title.rendered);
      this.saved = false;

      console.log(this.settings.getAll());
  }


  goBack() {
        this.navCtrl.push('HomePage');
  }

}

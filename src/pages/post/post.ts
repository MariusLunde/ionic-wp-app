import {Component, NgZone, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Settings} from "../../shared/providers/settings/settings";


@IonicPage()
@Component({
    selector: 'page-post',
    templateUrl: 'post.html',
})

export class PostPage {

    @ViewChild(Content) public content: Content;

    story: any;
    saved: boolean = false;
    button: boolean = true;



    constructor(public navCtrl: NavController, public navParams: NavParams, public settings: Settings, public change: NgZone) {
        this.story = this.navParams.get('story');

        this.settings.get(this.story.title.rendered) ? this.saved = true : this.saved = false;



  }


    ngAfterViewInit() {

        this.content.ionScroll.subscribe((data)=>{
            data.scrollTop >= this.content.getContentDimensions().scrollHeight - 500 ? this.button = false : this.button = true;

            if(this.button == false) {
                this.change.run(() => {
                })
            }else{
                this.change.run(() => {
                })
            }
        });
    }


  save(content: any) {

      if (content != this.settings.get('story')) {
          this.settings.set(content.title.rendered, content);
          this.saved = true;

      }

  }


  goBack() {
        this.navCtrl.push('HomePage');
  }

}


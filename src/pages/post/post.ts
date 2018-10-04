import {Component, NgZone, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Settings} from "../../shared/providers/settings/settings";
import {ServiceProvider} from "../../providers/service/service";


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
    commetns: Array<any> = new Array<any>();
    category: any;



    constructor(public navCtrl: NavController, public navParams: NavParams, public settings: Settings, public change: NgZone, public service: ServiceProvider) {
        this.story = this.navParams.get('story');

        this.category = this.service.getCategories();

        this.settings.get(this.story.name) ? this.saved = true : this.saved = false;

        this.service.getComments(this.story.id).subscribe(data => {
            for(let key in data){

                this.commetns[key] = data[key];
                console.log(this.commetns)
            }
        })

  }


    ngAfterViewInit() {

        this.content.ionScroll.subscribe((data)=>{
            data.scrollTop >= this.content.getContentDimensions().scrollHeight - 1000 ? this.button = false : this.button = true;

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


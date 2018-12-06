import {Component, NgZone, ViewChild} from '@angular/core';
import {Content, FabContainer, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Settings} from "../../shared/providers/settings/settings";
import {ServiceProvider} from "../../providers/service/service";
import {AuthenticationService} from "../../providers/authentication-service/authentication-service";
import { AlertController } from 'ionic-angular';
import {HomePage} from "../home/home";



@IonicPage()
@Component({
    selector: 'page-post',
    templateUrl: 'post.html',
})

export class PostPage {

    @ViewChild(Content) public content: Content;
    /**
     * Gets params from HomePage and puts it in to story.
     */
    story: any;
    /**
     *Returns true if saved and button does not show.
     */
    saved: boolean = false;
    /**
     *return false if user has srcolled to bottom of page and does not display the save button.
     */
    button: boolean = true;
    /**
     *Array of comments fetched from WordPress API using Service.ts.
     */
    comments: Array<any> = new Array<any>();
    /**
     *catgory is an Array of catgories relative to current post.
     */
    category: any;

    contentShown: any;

    input: string;

    savedStory : Array<any> = new Array<any>();


    /**
     *
     * @param navCtrl
     * @param navParams
     * @param service Service of functions with http.get methods
     * @param settings App settings, persistently stored locally between sessions.
     * @param change updates HTML code using (.run) command to check if button should be shown.
     */
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public settings: Settings,
                public change: NgZone,
                public service: ServiceProvider,
                private auth: AuthenticationService,
                public alertCon: AlertController
    ){
        this.story = this.navParams.get('story');

        // this.service.getElementorPost(this.story.id).subscribe(data => {
        //     this.contentShown = data;
        // });

        this.category = this.story._embedded['wp:term'][0];


        this.settings.get(this.story.name) ? this.saved = true : this.saved = false;

        this.service.getComments(this.story.id).subscribe(data => {
            for(let key in data){

                this.comments[key] = data[key];
            }
        });


  }

    /**
     * checks if button should show, have to be running ngAfterViewInit to know where user is scrolled to and return consol hight.
     */
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

    /**
     *Saves content to Settings.ts as the title of the story.
     */
  save(content, fab: FabContainer) {
            fab.close();
          this.settings.set(content.title.rendered, content);
          this.saved = true;
      }


  createComment(fab: FabContainer) {
      fab.close();
      let alert = this.alertCon.create({
          title: 'Create comment',
          inputs: [
              {
                  name: 'comment',
                  placeholder: 'Comment',
                  handler: data => {
                      this.input = data.value;
                  }
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel'
              },
              {
                  text: 'Submit',
                  handler: data => {
                      this.service.createComment(this.auth.getUser().token, this.story.id, data.comment).subscribe(data => {

                      });
                  }
              }
          ]
      });
      alert.present();
  }

    /**
     *returns to HomePage
     */
  goBack() {
        this.navCtrl.push(HomePage);
  }

  goToCat(evt){
      this.navCtrl.push(HomePage, {
          searchTerm: evt
      })
  }

}


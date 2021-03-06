import {Component, NgZone, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {Settings} from "../../shared/providers/settings/settings";
import {FavoritesPage} from "../favorites/favorites";

/**
 * Generated class for the SavedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {
    @ViewChild(Content) public content: Content;

    parsed: string;
    story: any;
    saved: boolean = false;

    button: boolean = true;


    constructor(public navCtrl: NavController, public navParams: NavParams, public settings: Settings, public zone: NgZone) {

        this.parsed = this.navParams.get('story');

        this.story = this.settings.get(this.parsed);


    }


    ngAfterViewInit() {

        this.content.ionScroll.subscribe((data)=>{
            data.scrollTop >= this.content.getContentDimensions().scrollHeight - 1000 ? this.button = false : this.button = true;

            if(this.button == false) {
                this.zone.run(() => {
                })
            }else{
                this.zone.run(() => {
                })
            }
        });
    }

    delete(content: any) {
        this.saved = true;
        this.settings.delete(content.title.rendered);
        this.navCtrl.push(FavoritesPage);
    }

}

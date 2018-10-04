import {Component, NgZone} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {Settings} from "../../shared/providers/settings/settings";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    /**
     * List of posts retrieved from wordpress
     */
    public story: Array<any> = new Array<any>();

    /**
     * Currently selected category
     *
     * TODO: What is this? :)
     */
    public category: any;

    /**
     * Flag set if more pages are available for download
     */
    morePagesAvailable: boolean = true;

    /**
     * Description here
     */
    searchTerm: string;

    /**
     * Description here
     */
    categoryId: any;


    /**
     * Initialize page components and prepare required data
     *
     * @param navCtrl NavController component
     * @param service Some kind of service? (TODO: What is this?)
     * @param settings App settings, persistently stored locally between sessions.
     * @param navParam NavParams supplied by Ionic on page creation
     * @param zone      A zone of some kind...? (TODO: What is this?)
     */
    constructor(public navCtrl: NavController, public service: ServiceProvider, public settings: Settings, public navParam: NavParams, private zone: NgZone) {
        this.category = this.service.getCategories();

        this.categoryId == undefined ? this.searchTerm = this.navParam.get('searchTerm') : false;

        this.search();

    }

    /**
     * Retrieve recent posts through the WordPress API
     *
     * TODO: Should return a promise for operation result handling
     */
    getPosts() {
        this.service.getRecentPosts(this.categoryId).subscribe(data => {
            for (let key in data) {
                this.story[key] = data[key];
            }
            console.log(this.story);
        });
    }

    /**
     * Description here
     *
     * TODO: Docs...
     *
     * @param story
     */
    postTapped(story: any) {
        this.navCtrl.push('PostPage', {
            story: story
        });
    }


    /**
     * Description here
     *
     * TODO: Docs...
     */
    doRefresh() {
        this.service.getRecentPosts(this.categoryId).subscribe(data => {
            this.getPosts();
            this.service.getCategories();
        });
    }

    /**
     * Description here
     *
     * TODO: Docs...
     */
    search() {
        this.category.filter((cat) => {
            if (cat.name.indexOf(this.searchTerm) > -1) {
                this.categoryId = cat.id;
            }
        });
        this.story = new Array<any>();
        this.getPosts();
    }


    /**
     * Description here
     *
     * TODO: Docs...
     */
    doInfinite(infiniteScroll) {
        let page = Math.ceil(this.story.length / 10) + 1;
        this.service.getRecentPosts(this.categoryId, page).subscribe(data => {
            for (let key in data) {
                this.story.push(data[key]);
                infiniteScroll.complete();
            }
        }, err => {
            this.morePagesAvailable = false;

            console.log(Object.keys(this.story));
        });
    }


    /**
     * Description here
     *
     * TODO: Docs...
     */
    toFavorites() {

        this.navCtrl.push('FavoritesPage');
    }

    /**
     * Description here
     *
     * TODO: Docs...
     */
    toCategories() {
        this.navCtrl.push('CategoriesPage', {
            cat: this.category
        });
    }

}

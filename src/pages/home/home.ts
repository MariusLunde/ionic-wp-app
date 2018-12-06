import {Component, ViewChild} from '@angular/core';
import {Card, FabContainer, NavController, NavParams, Slides} from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {Settings} from "../../shared/providers/settings/settings";
import {AuthenticationService} from "../../providers/authentication-service/authentication-service";
import * as Config  from "../../config";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Slides) slides: Slides;
    @ViewChild(Card) cards: Card;
    /**
     * List of posts retrieved from wordpress
     */
    public story: Array<any> = new Array<any>();

    /**
     * Currently selected category
     *
     * category is an array og numbers relative to categories-ids found in WordPress Rest API.
     */
    public category: any;


    /**
     *
     */
    public slidesGo: boolean;
    public ready: boolean = false;
    /**
     * Flag set if more pages are available for download
     */
    morePagesAvailable: boolean = true;

    /**
     * searchTerm is a string for seaching through the categories array to find ids to keep in catoryId.
     */
    searchTerm: string;

    /**
     * Array of ids relative to the WordPress site to use as parameters for the getRecentPosts function in Service.ts.
     */
    categoryId: any;

    identity: string = Config.WORDPRESS_URL;


    swipeLoaded: boolean;
    /**
     * Initialize page components and prepare required data
     *
     * @param navCtrl NavController component
     * @param service Service of functions with http.get methods
     * @param settings App settings, persistently stored locally between sessions.
     * @param navParam NavParams supplied by Ionic on page creation
     */
    constructor(public navCtrl: NavController,
                public service: ServiceProvider,
                public settings: Settings,
                public navParam: NavParams,
                public auth: AuthenticationService) {
        this.category = this.service.getCategories();

        this.categoryId == undefined ? this.searchTerm = this.navParam.get('searchTerm') : false;
        this.categoryId == undefined ? this.categoryId = this.navParam.get('searchTerm') : false;


        // this.settings.setAll(undefined);

        this.search();
    }
    /**
     * Retrieve recent posts through the WordPress API
     *
     * return promise of stories, else returns errormsg.
     */
  getPosts(id: number = this.categoryId, page: number = 1) {
      return new Promise((resolve, reject) => {
          this.service.getRecentPosts(id, page).subscribe(data => {
              if (data !== null) {
                  for(let key in data){
                      this.story[key] = data[key];
                      this.slidesGo = true;

                  }
                  this.ready = true;
                  resolve(this.story);
              } else {
                  reject("Unable to load the stories!");
              }
          });


      });
  }


    /**
     * Description here
     *
     * if post is pressed, pushes to PostPage with parameter of current story.
     *
     * @param story
     */


    postTapped(evt) {
        this.navCtrl.push('PostPage', {
            story: evt
        })
    }

    /**
     * Description here
     *
     * gets posts with promise of returned stories, else errormsg is logged.
     */
    doRefresh() {
        this.service.getRecentPosts(this.categoryId).subscribe(data => {
            this.getPosts().then((stories) => {
                console.log("Stories loaded ok!");
                this.service.getCategories();
            }).catch((errorMsg) => {
                console.error(errorMsg);
            });

        });
    }

    /**
     * Description here
     *
     * Filters catgory to check for values.
     * Sets new values for categoryId if value is found.
     * done? initiates stories and refires getPosts.
     * onreject? logs errorMsg.
     */
    search() {
        this.category.filter((cat) => {
            if (cat.name.indexOf(this.searchTerm) > -1) {
                this.categoryId = cat.id;
            }
        });
        this.story = new Array<any>();
        this.getPosts().then(stories =>{
        }).catch((errorMsg) =>{
            console.log(errorMsg);
        });
    }


    /**
     * Description here
     *
     * If scrolled to bottom of page return promise of new stories added, else return errormsg.
     */
    doInfinite(infiniteScroll) {
                let page = Math.ceil(this.story.length / 10) + 1;
                this.getPosts(this.categoryId, page).catch(infiniteScroll.complete())
    }


    /**
     * Description here
     *
     * Pushes to FavoritesPage.
     */
    toFavorites(fab: FabContainer) {
        fab.close();
        this.navCtrl.push('FavoritesPage');
    }

    /**
     * Description here
     *
     * Pushes to CategoriesPage.
     */
    toCategories() {
        this.navCtrl.push('CategoriesPage', {
            cat: this.category
        });

    }

    logOut(fab: FabContainer) {
        this.navCtrl.push('LoginPage');
        fab.close();
        this.auth.logOut();
    }


}
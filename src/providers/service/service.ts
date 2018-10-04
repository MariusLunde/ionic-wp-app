import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Config  from "../../config";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';


@Injectable()

export class ServiceProvider {

    title: any;
    category: Array<any> = new Array<any>();


    constructor(public http: HttpClient) {

  }



    getRecentPosts(categoryId:number, page:number = 1) {
        let category_url = categoryId? ("&categories=" + categoryId): "";

        return this.http.get(
            Config.WORDPRESS_REST_API_URL
            + 'posts/?_embed&post=1&page='+ page
            + category_url);
    }




    getComments(post) {
        return this.http.get(Config.WORDPRESS_REST_API_URL + 'comments/?post=' + post);

    }

    getCategories() {
        this.http.get(Config.WORDPRESS_REST_API_URL + "categories/").subscribe(data => {
            for(let key in data){
                this.category[key] = data[key];
            }
        });
        return this.category;
    }

}

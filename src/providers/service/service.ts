import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Config  from "../../config";

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';


@Injectable()

export class ServiceProvider {

    title: any;
    category: Array<any> = new Array<any>();


    constructor(
        public http: HttpClient,
    ) {

  }

  getHeader() {
      return this.http.get<any>(Config.WORDPRESS_URL, {observe: 'response'});

  }



    getRecentPosts(categoryId:number, page:number = 1) {
        let category_url = categoryId? ("&categories=" + categoryId): "";
        let postUrl = page ? 'posts?page=' + page : "";

        return this.http.get(
            Config.WORDPRESS_REST_API_URL + postUrl + category_url);
    }


    getElementorPost(pageId: number) {
        return this.http.get(
            Config.WORDPRESS_PLUGIN_ELEMENTOR_URL + 'pages/' + pageId + '/contentElementor'
        );
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

    createComment(token, input) {
        let header : Headers = new Headers();
        header.append('Authorization', 'Bearer ' + token);

        return this.http.post(Config.WORDPRESS_REST_API_URL + '/wp/v2/comments/(?P<id>[\\d]+)\t\n' + token, {header: header},{});
    }

}

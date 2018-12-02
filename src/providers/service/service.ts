import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Config  from "../../config";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {AuthenticationService} from "../authentication-service/authentication-service";
import {Observable} from "rxjs";


@Injectable()

export class ServiceProvider {

    title: any;
    category: Array<any> = new Array<any>();


    constructor(
        public http: HttpClient,
        private auth: AuthenticationService
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

    createComment(token, id, input){
        let comment_url = "&post=" + id;
        let header : Headers = new Headers();
        header.append('Authorization', 'Basic ' + token);
        console.log(header);
        console.log(this.auth.getUser().user.ID);
        return this.http.post(Config.WORDPRESS_URL + '/wp-json/wp/v2/comments?'
            + comment_url,
            {
                token: token,
                content: input,
                author_id: this.auth.getUser().user.ID,
                author_name: this.auth.getUser().user.data.display_name,
                author_email: this.auth.getUser().user.data.user_email,
                // post: JSON.stringify(id),
                }, {});
    }

}

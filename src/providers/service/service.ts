import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Config  from "../../config";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';


@Injectable()

export class ServiceProvider {

    title: any;


    constructor(public http: HttpClient) {

  }

    getRecentPosts(categoryId: number, page: number = 1) {
        let category_url = categoryId? ("&categories=" + categoryId): "";

        return this.http.get(Config.WORDPRESS_REST_API_URL + 'posts?page=' + page + category_url);
    }

    getCategories(){
        return this.http.get(Config.WORDPRESS_REST_API_URL + "categories");
    }

}

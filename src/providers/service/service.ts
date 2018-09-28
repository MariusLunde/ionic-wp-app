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

    getRecentPosts(categoryId: number) {

        let ifSearch;


        categoryId == undefined ? categoryId = 17 : categoryId;

        categoryId == 17 ? ifSearch = "posts" :  ifSearch = "posts?categories=" + categoryId;

        return this.http.get(Config.WORDPRESS_REST_API_URL + ifSearch);

    }

    getCategories() {
        this.http.get(Config.WORDPRESS_REST_API_URL + "categories").subscribe(data => {
            for(let key in data){
                this.category[key] = data[key];
            }
        });
        return this.category;
    }

}

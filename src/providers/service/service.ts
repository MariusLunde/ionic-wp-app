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

    getRecentPosts() {

        return this.http.get(Config.WORDPRESS_REST_API_URL);
    }
}

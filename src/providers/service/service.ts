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

    getRecentPosts(categoryId: string) {

        return this.http.get(Config.WORDPRESS_REST_API_URL + 'posts?search=' + categoryId);
    }

    getCategories() {
        this.http.get(Config.WORDPRESS_REST_API_URL + "categories").subscribe(data => {
            for(let key in data){
                this.category[key] = data[key];
            }
        });
        return this.category;
    }

    searchCategories(searchTerm) {
        if(searchTerm == ''){
            return [];
        }
        let lcSearchTerm = searchTerm.toLowerCase();

        this.http.get(Config.WORDPRESS_REST_API_URL + "posts?search=" + lcSearchTerm).subscribe( data => {
            return data;

        });
    }

    // filterItems(searchTerm, max = 10){
    //     if(searchTerm == ''){
    //         return [];
    //     }
    //     let lcSearchTerm = searchTerm.toLowerCase();
    //     return this.cars.filter((car) => {
    //         if(car.title.toLowerCase().indexOf(lcSearchTerm) > -1 || car.brand.toLowerCase().indexOf(lcSearchTerm) > -1 ) {
    //             return -1
    //         }else{
    //             return null;
    //         }
    //     }).slice(0, max);
    // }
}
